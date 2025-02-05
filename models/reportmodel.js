// reportmodel.js
/**
 * @module models/report
 * @description Defines the schema and model for monthly reports in the cost manager application
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} CostEntry
 * @property {number} sum - The monetary amount of the cost
 * @property {string} description - Description of the cost
 * @property {number} day - Day of the month when the cost occurred
 */

/**
 * @typedef {Object} CategoryCosts
 * @property {CostEntry[]} food - Array of food-related costs
 * @property {CostEntry[]} health - Array of health-related costs
 * @property {CostEntry[]} housing - Array of housing-related costs
 * @property {CostEntry[]} sport - Array of sport-related costs
 * @property {CostEntry[]} education - Array of education-related costs
 * @property {CostEntry[]} entertainment - Array of entertainment-related costs
 * @property {CostEntry[]} other - Array of other costs
 */

/**
 * @typedef {Object} MonthlyReport
 * @property {string} user_id - The unique identifier of the user
 * @property {number} year - The year of the report
 * @property {number} month - The month of the report (1-12)
 * @property {CategoryCosts[]} costs - Array of categorized costs
 */

const MonthlyReportSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
		unique: true
	},
	year: {
		type: Number,
		required: true
	},
	month: {
		type: Number,
		required: true
	},
	costs: [{
		type: {
			food: [{
				sum: Number,
				description: String,
				day: Number,
				_id: false
			}],
			health: [{
				sum: Number,
				description: String,
				day: Number,
				_id: false
			}],
			housing: [{
				sum: Number,
				description: String,
				day: Number,
				_id: false
			}],
			sport: [{
				sum: Number,
				description: String,
				day: Number,
				_id: false
			}],
			education: [{
				sum: Number,
				description: String,
				day: Number,
				_id: false
			}],
			entertainment: [{
				sum: Number,
				description: String,
				day: Number,
				_id: false
			}],
			other: [{
				sum: Number,
				description: String,
				day: Number,
				_id: false
			}]
		},
	}]
}, {
	toJSON: {
		transform: (doc, ret) => {
			delete ret._id;
			delete ret.__v;
		}
	}
});

module.exports = mongoose.model("reports", MonthlyReportSchema);