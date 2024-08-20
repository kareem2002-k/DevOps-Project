const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming User is your Mongoose model
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = new User({ username, password: hashedPassword });
    await user.save();
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Username:', username); // Log the username

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(403).send('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password Comparison:', isPasswordValid); // Log the comparison result

    if (!isPasswordValid) {
      console.log('Invalid Credentials');
      return res.status(403).send('Invalid Credentials');
    }

    // Generate JWT token
    const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      message: 'Login successful',
      accessToken
    });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
