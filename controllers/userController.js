const User = require('./../models/userModel');

const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

const sendFakeCookie = (res) => {
  res.cookie('jwt', '0', {
    expires: new Date(Date.now() + process.env.JWT__COOKIE__EXPIRES / 90),
    // secure: false,
    httpOnly: false,
  });
};

const sendCookie = (res, token) => {
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT__COOKIE__EXPIRES * 24 * 60 * 60 * 1000
    ),
    // secure: false,
    httpOnly: false,
  });
};

const tokenAssigner = (id) => {
  return jwt.sign({ id }, process.env.JSON__TOKEN__SECRET, {
    expiresIn: process.env.TOKEN__EXPIRY,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = tokenAssigner(newUser._id);

    // res.cookie('jwt', token, {
    //   expires: new Date(
    //     Date.now() + process.env.JWT__COOKIE__EXPIRES * 24 * 60 * 60 * 1000
    //   ),
    //   // secure: true,
    //   httpOnly: true,
    // });

    sendCookie(res, token);

    newUser.password = undefined;

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

      sendCookie(res, token);

      // res.cookie('jwt', token, {
      //   expires: new Date(
      //     Date.now() + process.env.JWT__COOKIE__EXPIRES * 24 * 60 * 60 * 1000
      //   ),
      //   // secure: true,
      //   httpOnly: true,
      // });

      res.status(200).json({
        status: 'success',
        token,
        user,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.stack,
    });
  }
};

exports.pushLogin = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.logout = (req, res) => {
  sendFakeCookie(res);

  res.status(200).json({
    status: 'success',
  });
};
