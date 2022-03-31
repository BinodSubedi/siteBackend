const mongoose = require('mongoose');
const { post } = require('../routes/postRoute');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Please Provide a title to the post'],
  },
  bodyText: {
    type: String,
    required: [true, 'Please provide a body to the post'],
  },
  imageUrl: String,
  imageName: {
    type: String,
    required: [true, 'please give the image name'],
  },
  source: [String],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
