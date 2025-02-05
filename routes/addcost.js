// addcost.js
/**
 * @module routes/addcost
 * @description Handles routes for adding new cost items to the system
 */

const express = require('express');
const router = express.Router();
const addCost = require('../models/costitemmodel');

/**
 * POST /api/add
 * @description Creates a new cost item entry
 * @param {Object} req.body - The cost item details
 * @param {string} req.body.user_id - User ID associated with the cost
 * @param {string} req.body.description - Description of the cost
 * @param {string} req.body.category - Category of the cost
 * @param {number} req.body.sum - Amount of the cost
 * @param {number} [req.body.year] - Year of the cost (defaults to current year)
 * @param {number} [req.body.month] - Month of the cost (defaults to current month)
 * @param {number} [req.body.day] - Day of the cost (defaults to current day)
 * @returns {Object} JSON object containing the created cost item
 * @throws {Error} When required fields are missing or invalid
 */

router.post('/add', async(req, res) => {
	const currentDate = new Date();

	const costItem = new addCost({
		user_id: req.body.user_id,
		year: req.body.year || currentDate.getFullYear(),
		month: req.body.month || currentDate.getMonth() + 1,
		day: req.body.day || currentDate.getDate(),
		description: req.body.description,
		category: req.body.category,
		sum: req.body.sum,
	});

	try {
		const savedCostItem = await costItem.save();
		console.log(savedCostItem._id);
		res.status(201).json(savedCostItem);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Internal server error',
			details: error.message
		});
	}
});

module.exports = router;