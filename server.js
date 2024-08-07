const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const app = require('./app');

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`DB connection successfull`));

const port = process.env.PORT || 2003;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});