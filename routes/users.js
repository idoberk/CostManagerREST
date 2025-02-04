const express = require('express');
const router = express.Router();
const users = require('../models/usermodel');

/* GET users listing. */
router.get('/api/users/:id', async(req, res) => {
  try {
    const user = await users.findOne({ id: req.params.id });

    if (!user) {
      return res.status(404).json({
        error: 'User was not found'
      });
    }

    const userResponse = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total: 0
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
