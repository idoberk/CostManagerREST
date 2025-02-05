// users.js
/**
 * @module routes/users
 * @description Handles routes for user-related operations
 */

const express = require('express');
const router = express.Router();
const users = require('../models/usermodel');
const CostItems = require('../models/costitemmodel');

/**
 * GET /api/users/:id
 * @description Retrieves user information and their total costs
 * @param {string} req.params.id - User ID to lookup
 * @returns {Object} JSON object containing user details and total costs
 * @throws {Error} When user is not found or server error occurs
 */

router.get('/users/:id', async(req, res) => {
  try {
    const user = await users.findOne({ id: req.params.id });

    if (!user) {
      return res.status(404).json({
        error: 'User was not found'
      });
    }

    const costItems = await CostItems.find({ user_id: req.params.id });
    const totalCosts = costItems.reduce((acc, item) => acc + (item.sum || 0), 0);

    const userResponse = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total: totalCosts
    };

    res.json(userResponse);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

module.exports = router;
