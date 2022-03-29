const User = require('./../models/userModel');

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
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

    const user = await User.find({ username });

    if (user) {
      res.status(200).json({
        status: 'success',
        user,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};
