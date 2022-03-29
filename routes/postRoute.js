const express = require('express');

const router = express.Router();

const postController = require('./../controllers/postController');

router.route('/').get(postController.getAllPosts);

router.route('/createPost').post(postController.setPost);

module.exports = router;
