const express = require('express');
const router = express.Router();
const otpCustomerController = require('../controllers/otpCustomerController');

router.get('/', otpCustomerController.handleSendOtpToEmail);
router.get('/compare', otpCustomerController.compareOtpByEmail);

module.exports = router;