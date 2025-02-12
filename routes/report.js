// report.js
/**
 * @module routes/report
 * @description Handles routes for generating and retrieving monthly reports
 */

const express = require('express');
const router = express.Router();
const MonthlyReport = require('../models/reportmodel');
const CostItem = require('../models/costitemmodel');

/**
 * GET /api/report
 * @description Generates or retrieves a monthly cost report for a specific user
 * @param {Object} req.query
 * @param {string} req.query.id - User ID
 * @param {number} req.query.year - Year for the report
 * @param {number} req.query.month - Month for the report
 * @returns {Object} JSON object containing the monthly report
 * @throws {Error} When parameters are invalid or server error occurs
 */

router.get('/report', async(req, res) => {
	const { id, year, month } = req.query;
	const getReport = await MonthlyReport.findOne({
		user_id: id,
		year: year,
		month: month
	});

	if(!getReport) {
		const costItems = await CostItem.find({
			user_id: id,
			year,
			month
		});

		const newReport = new MonthlyReport({
			user_id: id,
			year: year,
			month: month,
			costs: [{
				food: [],
				health: [],
				housing: [],
				sport: [],
				education: [],
				entertainment: [],
				other: []
			}]
		});

		costItems.forEach(item => {
			if (newReport.costs[0][item.category]) {
				newReport.costs[0][item.category].push({
					sum: item.sum,
					description: item.description,
					day: item.day
				});
			}
		});

		try {
			await newReport.save();
			res.status(201).json(newReport);
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: 'Internal server error',
				details: error.message
			});
		}
	} else {
		res.status(200).json(getReport);
	}
});

module.exports = router;