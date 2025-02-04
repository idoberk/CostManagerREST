const mongoose = require('mongoose');

const costItemSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
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