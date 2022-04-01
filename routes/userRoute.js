const express = require('express');

const router = express.Router();

const authController = require('./../controllers/authController');

const userController = require('./../controllers/userController');

router.route('/signup').post(userController.signup);

router.route('/login').post(userController.login);

router.route('/pushLogin').get(authController, userController.pushLogin);

router.route('/logout').get(userController.logout);

module.exports = router;
