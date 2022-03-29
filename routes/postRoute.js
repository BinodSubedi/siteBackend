const express = require('express');

const router = express.Router();

const postController = require('./../controllers/postController');

const authController = require('./../controllers/authController');

router.route('/').get(postController.getAllPosts);

router.route('/createPost').post(authController, postController.setPost);

module.exports = router;
