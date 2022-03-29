const express = require('express');

const app = express();

app.use(express.json());

const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');

app.use('/api/v1/post', postRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
