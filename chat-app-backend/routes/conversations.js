const express = require('express');
const Conversation = require('../models/Conversation');
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

router.post('/start-conversation', authenticateToken, async (req, res) => {
  const { friendUsername } = req.body;

  try {
    const user = await User.findOne({ username: req.user.username });
    const friend = await User.findOne({ username: friendUsername });

    if (!friend) {
      return res.status(404).send('User not found');
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [user._id, friend._id] }
    }).populate('messages.sender', 'username');

    if (!conversation) {
      conversation = new Conversation({
        participants: [user._id, friend._id],
        messages: []
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Chat History for a Conversation
router.get('/conversation/:id', authenticateToken, async (req, res) => {
  const conversationId = req.params.id;

  try {
    const conversation = await Conversation.findById(conversationId)
      .populate('messages.sender', 'username');

    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }

    res.status(200).json(conversation.messages);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
