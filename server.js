const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

mongoose
  .connect(process.env.MongoDB__URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => console.log(err));

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
