const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const parse = require('nodemon/lib/cli/parse');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter the username'],
  },
  email: {
    type: String,
    unique: true,
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
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const timeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return jwtTimeStamp < timeStamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
