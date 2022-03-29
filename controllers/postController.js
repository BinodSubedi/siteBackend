const Post = require('./../models/postModel');

exports.getAllPosts = async (req, res) => {
  const post = await Post.find().select('-__v');

  res.status(200).json({
    numbers: post.length,
    post,
  });
};

exports.setPost = async (req, res) => {
  const data = await Post.create(req.body);

  res.status(200).json({
    type: 'Success',
    data,
  });
};
