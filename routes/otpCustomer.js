const express = require('express');
const router = express.Router();
const otpCustomerController = require('../controllers/otpCustomerController');

router.post('/', otpCustomerController.handleSendOtpToEmail); 
router.post('/compare', otpCustomerController.compareOtpByEmail);

router.post('/password', otpCustomerController.handleSendOtpToChangePassword);
router.post('/comparePassword', otpCustomerController.compareOtpByPassword);


module.exports = router;