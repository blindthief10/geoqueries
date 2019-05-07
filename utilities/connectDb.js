const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDb = async () => {
  console.log('About to connect to databse');
  await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
  console.log('Connected to database! Success');
}

module.exports = connectDb;
