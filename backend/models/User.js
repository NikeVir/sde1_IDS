// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
