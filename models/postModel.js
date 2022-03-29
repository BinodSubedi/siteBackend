const mongoose = require('mongoose');
const { post } = require('../routes/postRoute');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Provide a title to the post'],
  },
  bodyText: {
    type: String,
    required: [true, 'Please provide a body to the post'],
  },
  imageeUrl: String,
  source: [String],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
