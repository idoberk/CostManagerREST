const express = require('express');
const router = express.Router();
const addCost = require('../models/costitemmodel');

const cors = require('cors');
router.use(cors());

router.post('/api/add', async(req, res) => {
	const costItem = new addCost({
		user_id: req.body.user_id,
		description: req.body.description,
		category: req.body.category,
		sum: req.body.sum
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