// about.js
/**
 * @module routes/about
 * @description Handles routes for retrieving developer team information
 */

const express = require('express');
const router = express.Router();

/**
 * GET /api/about
 * @description Returns information about the development team
 * @returns {Object[]} Array of developer information objects
 * @returns {string} returns[].first_name - Developer's first name
 * @returns {string} returns[].last_name - Developer's last name
 */

router.get('/about', (req, res) => {
	const developersTeam = [
		{
			first_name: 'Dekel',
			last_name: 'Motzan',
		},
		{
			first_name: 'Ido',
			last_name: 'Berkovits',
		}
	];

	res.status(200).json(developersTeam);
});

module.exports = router;


