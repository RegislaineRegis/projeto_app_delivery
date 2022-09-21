const express = require('express');
require('express-async-errors');
const cors = require('cors');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');
const loginRoute = require('../routes/loginRoute');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRoute);

app.use(errorHandlerMiddleware);

module.exports = app;
