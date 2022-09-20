const express = require('express');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');
const loginRoute = require('../routes/loginRoute');
require('express-async-errors');

const app = express();

app.use(express.json());

app.use('/login', loginRoute);

app.use(errorHandlerMiddleware);

module.exports = app;
