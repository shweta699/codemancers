const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send('Invalid email or password.');
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send('Invalid email or password.');
  const token = user.generateToken();
  res.header('x-auth-token', token).send(`Hello, ${email}!`);
});

router.post('/logout', async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.send('Logged out successfully.');
});

module.exports = router;