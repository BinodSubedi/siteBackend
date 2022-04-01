const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('./../models/userModel');

module.exports = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      return res.status(400).json({
        status: 'fail',
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JSON__TOKEN__SECRET
    );

    const thatUser = await User.findById(decoded.id);

    if (thatUser) {
      if (!thatUser.changedPasswordAfter(decoded.iat)) {
        next();
      }
    }
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};
