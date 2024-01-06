const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const UserActivity = require('../models/UserActivity');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.send('Admin Route');
});

router.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      password:hashedPassword,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/api/login', async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token, admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/api/active_count', async (req, res) => {
  var token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    jwt.verify(token, 'your-secret-key', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const currentDate = new Date();

      const dailyActiveUsersCount = await UserActivity.countDocuments({
        lastLogin: { $gte: new Date(currentDate.setHours(0, 0, 0, 0)) },
      });

      const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
      const weeklyActiveUsersCount = await UserActivity.countDocuments({
        lastLogin: { $gte: new Date(weekStart.setHours(0, 0, 0, 0)) },
      });

      const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const monthlyActiveUsersCount = await UserActivity.countDocuments({
        lastLogin: { $gte: new Date(monthStart.setHours(0, 0, 0, 0)) },
      });

      res.json({
        dailyActiveUsersCount,
        weeklyActiveUsersCount,
        monthlyActiveUsersCount,
      });
    });
  } catch (error) {
    console.error('Error counting active users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.get('/api/top-users', async (req, res) => {
  var token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    jwt.verify(token, 'your-secret-key', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    
    const { gender, device, country } = req.query;

    const filters = {};

    if (gender) {
      filters['userDetails.gender'] = gender;
    }

    if (device) {
      filters['userDetails.device'] = device;
    }

    if (country) {
      filters['userDetails.country'] = country;
    }

    const topUsers = await UserActivity.aggregate([
      {
        $sort: { duration: -1 }, 
      },
      {
        $limit: 15, 
      },
      {
        $lookup: {
          from: 'users', 
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $match: filters, 
      },
      {
        $project: {
          _id: 0,
          duration: 1,
          user: '$userDetails',
        },
      },

    ]);

    res.json({ topUsers });
  });
  } catch (error) {
    console.error('Error getting top users by duration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.post('/api/upload', async (req, res) => {
  var token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    jwt.verify(token, 'your-secret-key', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    console.log(req.body);
    try{
      const users = req.body;
      for(let i=1;i<users.length;i++){
          const data = new User({
            name: users[i].name,
            email:  users[i].email,
            country: users[i].country,
            gender:users[i].gender,
            device:users[i].device,
            password: await bcrypt.hash(users[i].email, 10),
          });
          const response = await data.save();
          
      } 
    }
    catch(error){
      console.log(error);
    }
    }); 
  } catch (error) {
    console.error('Error inserting users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})
module.exports = router;
