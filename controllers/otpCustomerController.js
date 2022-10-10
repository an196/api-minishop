const { generateOTP, sendOtpToEmail } = require('../helper/otp');

const handleSendOtpToEmail = (req, res) => {
    console.log(req?.body?.toEmail)
    if(!req?.body?.toEmail)
        return res.status(400).json({ message: 'Email received is required' });

    const newOTP = generateOTP(6);
    sendOtpToEmail(req.body.toEmail, newOTP);
    return res.status(200).json({ message: 'OTP has sent to email' });
};

const compareOtpByEmail = (req, res) => {
    console.log(compareOtpByEmail);
};

module.exports = { handleSendOtpToEmail, compareOtpByEmail };
