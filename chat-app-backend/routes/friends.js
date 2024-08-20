const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/add-friend', authenticateToken, async (req, res) => {
  const { friendUsername } = req.body;

  try {
    const user = await User.findOne({ username: req.user.username });
    const friend = await User.findOne({ username: friendUsername });

    if (!friend) {
      return res.status(404).send('User not found');
    }

    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      friend.friends.push(user._id);
      await user.save();
      await friend.save();
    }

    res.status(200).send('Friend added');
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
