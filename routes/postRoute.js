const express = require('express');

// const multer = require('multer');

const router = express.Router();

// const upload = multer({ dest: './img/posts' });

const postController = require('./../controllers/postController');

const authController = require('./../controllers/authController');

router.route('/').get(postController.getAllPosts);

router
  .route('/createPost')
  .post(authController, postController.postImgUpload, postController.setPost);

module.exports = router;
