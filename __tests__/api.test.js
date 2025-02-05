const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/usermodel');
const CostItem = require('../models/costitemmodel');
const MonthlyReport = require('../models/reportmodel');

beforeAll(async () => {
	// Connect to a test database
	await mongoose.connect(process.env.MONGODB_URI, {
		dbName: 'costmanager_test'
	});
});

beforeEach(async () => {
	// Clear all collections before each test
	await User.deleteMany({});
	await CostItem.deleteMany({});
	await MonthlyReport.deleteMany({});

	// Create test user
	await User.create({
		id: '123123',
		first_name: 'mosh',
		last_name: 'israeli',
		birthday: new Date('1990-01-01'),
		martial_status: 'single'
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});

describe('POST /api/add', () => {
	it('should create a new cost item', async () => {
		const costData = {
			user_id: '123123',
			description: 'Test cost',
			category: 'food',
			sum: 50
		};

		const response = await request(app)
			.post('/api/add')
			.send(costData)
			.expect(201);

		expect(response.body).toHaveProperty('_id');
		expect(response.body.description).toBe(costData.description);
		expect(response.body.category).toBe(costData.category);
		expect(response.body.sum).toBe(costData.sum);
	});

	it('should return 500 for invalid category', async () => {
		const invalidCostData = {
			user_id: '123123',
			description: 'Test cost',
			category: 'invalid_category',
			sum: 50
		};

		await request(app)
			.post('/api/add')
			.send(invalidCostData)
			.expect(500);
	});
});

describe('GET /api/report', () => {
	beforeEach(async () => {
		// Add some test cost items
		await CostItem.create([
			{
				user_id: '123123',
				year: 2025,
				month: 2,
				day: 1,
				description: 'Groceries',
				category: 'food',
				sum: 100
			},
			{
				user_id: '123123',
				year: 2025,
				month: 2,
				day: 2,
				description: 'Rent',
				category: 'housing',
				sum: 1000
			}
		]);
	});

	it('should return monthly report for existing costs', async () => {
		const response = await request(app)
			.get('/api/report')
			.query({ id: '123123', year: 2025, month: 2 })
			.expect(201);

		expect(response.body).toHaveProperty('costs');
		expect(response.body.user_id).toBe('123123');
		expect(response.body.year).toBe(2025);
		expect(response.body.month).toBe(2);

		// Check if categories are present
		const categories = response.body.costs[0];
		expect(categories).toHaveProperty('food');
		expect(categories).toHaveProperty('housing');
	});

	it('should return existing report if already generated', async () => {
		// First request generates the report
		await request(app)
			.get('/api/report')
			.query({ id: '123123', year: 2025, month: 2 });

		// Second request should return existing report
		const response = await request(app)
			.get('/api/report')
			.query({ id: '123123', year: 2025, month: 2 })
			.expect(200);

		expect(response.body).toHaveProperty('costs');
	});
});

describe('GET /api/users/:id', () => {
	beforeEach(async () => {
		// Add some test cost items for the user
		await CostItem.create([
			{
				user_id: '123123',
				description: 'Test cost 1',
				category: 'food',
				sum: 50
			},
			{
				user_id: '123123',
				description: 'Test cost 2',
				category: 'housing',
				sum: 100
			}
		]);
	});

	it('should return user details with total costs', async () => {
		const response = await request(app)
			.get('/api/users/123123')
			.expect(200);

		expect(response.body.id).toBe('123123');
		expect(response.body.first_name).toBe('mosh');
		expect(response.body.last_name).toBe('israeli');
		expect(response.body.total).toBe(150); // Sum of all cost items
	});

	it('should return 404 for non-existing user', async () => {
		await request(app)
			.get('/api/users/999999')
			.expect(404);
	});
});

describe('GET /api/about', () => {
	it('should return developer team information', async () => {
		const response = await request(app)
			.get('/api/about')
			.expect(200);

		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toBeGreaterThan(0);

		response.body.forEach(developer => {
			expect(developer).toHaveProperty('first_name');
			expect(developer).toHaveProperty('last_name');
		});
	});
});