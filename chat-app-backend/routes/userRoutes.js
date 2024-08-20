const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User is your Mongoose model
const router = express.Router();

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).send('Token required');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
};

// Get user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Find the user based on the token's username
    const user = await User.findOne({ username: req.user.username });
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Exclude sensitive data like password before sending the response
    const { password, ...userData } = user.toObject();
    
    res.json(userData);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
