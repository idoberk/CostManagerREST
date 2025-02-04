const mongoose = require('mongoose');

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