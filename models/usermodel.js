// usermodel.js
/**
 * @module models/user
 * @description Defines the schema and model for users in the cost manager application
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user
 * @property {string} first_name - User's first name
 * @property {string} last_name - User's last name
 * @property {Date} birthday - User's date of birth
 * @property {string} martial_status - User's marital status
 */

const userSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	birthday: {
		type: Date,
		required: true
	},
	martial_status: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("users", userSchema);