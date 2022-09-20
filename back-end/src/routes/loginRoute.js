const express = require('express');
const loginController = require('../controllers/loginController');
require('express-async-errors');

const router = express.Router();

router.post('/', loginController.login);

module.exports = router;