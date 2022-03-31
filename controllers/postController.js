const Post = require('./../models/postModel');
const multer = require('multer');
const { diskStorage } = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './img/posts');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];

    const filename = req.body.title.split(' ').join('');
    // console.log(filename);

    cb(null, `${filename}.${ext}`);
  },
});

const multerFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please enter correct form of file'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
});

exports.postImgUpload = upload.single('photo');

exports.getAllPosts = async (req, res) => {
  const post = await Post.find().select('-__v');

  res.status(200).json({
    numbers: post.length,
    post,
  });
};

exports.setPost = async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  req.body.imageName = req.file.filename;

  const data = await Post.create(req.body);

  res.status(200).json({
    type: 'Success',
    data,
  });
};
