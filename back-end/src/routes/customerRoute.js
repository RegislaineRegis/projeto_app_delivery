const express = require('express');
const customerController = require('../controllers/customerController');
require('express-async-errors');

const router = express.Router();

router.get('/products', customerController.getAll);

module.exports = router;