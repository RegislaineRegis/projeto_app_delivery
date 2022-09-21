const express = require('express');
const registerController = require('../controllers/registerController');
require('express-async-errors');

const router = express.Router();

router.post('/', registerController.create);

module.exports = router;