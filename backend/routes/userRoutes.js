// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ScreenTime = require('../models/UserActivity');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const JWT_TOKEN = "FSFSJHFIEBSFEBSF15646&^%^" 
router.get('/', (req, res) => {
  res.send('User Route');
});


router.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, gender, country, device } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      country,
      device
    });
    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.post('/api/login', async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const screen = await ScreenTime.findOne({ user: user._id });
    console.log(screen)
    if (screen == null) {
      const newScreenTimeEntry = new ScreenTime({ user: user._id, duration: 0, lastLogin: Date.now() });
      await newScreenTimeEntry.save();
    }
    else {
      screen.lastLogin = Date.now();
      await screen.save();
    }



    const token = jwt.sign({ userId: user._id }, JWT_TOKEN, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.post('/api/record', async (req, res) => {

  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    jwt.verify(token,JWT_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      const { screenTime, id } = req.body;
      const screen = await ScreenTime.findOne({ user: id });
      if (!screen) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      screen.duration += screenTime;

      await screen.save();

      res.status(200).json({ message: 'Screen time data recorded successfully' });
    });

  } catch (error) {
    console.error('Error recording screen time data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get('/api/tokenverify', async (req, res) => {
  try{
    console.log(req.headers.authorization)
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.json({ message: 'Unauthorized' });
    }
    jwt.verify(token,JWT_TOKEN, async (err, decoded) => {
      if (err) {
        return res.json({ message: 'Unauthorized' });
      }
      res.json({ message: 'Authorized' });
    });
  }
  catch(error){
    console.log(error);
  }
})


module.exports = router;