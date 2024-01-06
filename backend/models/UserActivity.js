const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  lastLogin: {
    type: Date,
  },
  duration: {
    type: Number,
    required: true,
  },
  activityLogs: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      action: String, 
    },
  ],
});


const User = mongoose.model('UserActivity', userSchema);

module.exports = User;
