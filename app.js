const express = require('express');

const cookieParser = require('cookie-parser');

const cors = require('cors');

const app = express();

app.use(express.static('./../siteFront-end/build'));

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');

app.use('/api/v1/post', postRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
