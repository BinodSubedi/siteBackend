const User = require('./../models/userModel');

const jwt = require('jsonwebtoken');

const tokenAssigner = (id) => {
  return jwt.sign({ id }, process.env.JSON__TOKEN__SECRET, {
    expiresIn: process.env.TOKEN__EXPIRY,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = tokenAssigner(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      newUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const correct = await user.comparePassword(password, user.password);

    if (user && correct) {
      const token = tokenAssigner(user._id);

      res.status(200).json({
        status: 'success',
        token,
        user,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};
