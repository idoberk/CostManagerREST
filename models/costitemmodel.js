// costitemmodel.js
/**
 * @module models/costitemmodel
 * @description Defines the Schema and model for cost items in the cost manager application.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} CostItem
 * @property {string} user_id - The unique identifier of the user who created the cost item
 * @property {number} year - The year when the cost occurred
 * @property {number} month - The month when the cost occurred (1-12)
 * @property {number} day - The day of the month when the cost occurred
 * @property {string} description - A description of the cost item
 * @property {('food'|'health'|'housing'|'sport'|'education'|'entertainment'|'other')} category - The category of the cost
 * @property {number} sum - The monetary amount of the cost
 */

/**
 * Schema definition for cost items
 * @type {mongoose.Schema}
 */

const costItemSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
	},
	month: {
		type: Number,
	},
	day: {
		type: Number,
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		enum: [
			'food',
			'health',
			'housing',
			'sport',
			'education',
			'entertainment',
			'other'
		],
		required: true
	},
	sum: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("costs", costItemSchema);