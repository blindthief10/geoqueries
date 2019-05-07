const express = require('express');
const app = express();
const morgan = require('morgan');
const connectDb = require('./utilities/connectDb');

app.listen(4000, () => console.log('Server listens to requests'));
connectDb();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
