const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User is your Mongoose model
const router = express.Router();
const bcrypt = require('bcrypt');

// Register new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser){
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }
    

    // Create new user
    const user = new User({ username, password });
    await user.save();
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Username:', username); // Log the username
  const user = await User.findOne({ username });

  if (!user) {
    console.log('User not found');
    return res.status(403).send('Invalid Credentials');
  }

  console.log('Stored Password:', user.password); // Log the stored hashed password
  console.log('Password Comparison:', await bcrypt.compare(password, user.password)); // Log the comparison result

  if (!(await bcrypt.compare(password, user.password))) {
    console.log('Invalid Credentials');
    return res.status(403).send('Invalid Credentials');
  }

  const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  res.json({ accessToken });
});


module.exports = router;



