const express = require('express');
require('express-async-errors');
const cors = require('cors');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');
const loginRoute = require('../routes/loginRoute');
const registerRoute = require('../routes/registerRoute');
const customerRoute = require('../routes/customerRoute');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRoute);

app.use('/register', registerRoute);

app.use('/customer', customerRoute);

app.use('/images', express.static('public'));

app.use(errorHandlerMiddleware);

module.exports = app;
