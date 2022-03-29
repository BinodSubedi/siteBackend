const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter the username'],
  },
  email: {
    type: String,
    required: [true, 'Please enter the email'],
    validator: [validator.isEmail, 'Please Enter correct email'],
  },
  password: {
    type: String,
    required: [true, 'please enter your password'],
  },
  Admin: {
    type: String,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
