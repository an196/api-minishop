const express = require('express');
const router = express.Router();
const authCustomerController = require('../controllers/authCustomerController');

router.post('/', authCustomerController.handleLogin);

module.exports = router;