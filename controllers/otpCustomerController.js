const { generateOTP, sendOtpToEmail } = require('../helper/otp');
const Customer = require('../models/Customer');

const handleSendOtpToEmail = async (req, res) => {
    if(!req?.body?.toEmail)
        return res.status(400).json({ message: 'Email received is required' });

    const newOTP = generateOTP(6);
    //sendOtpToEmail(req.body.toEmail, newOTP);
    //res.status(200).json({ message: 'OTP has sent to email' });
    
    const customer = await Customer.findOne({ email: req?.body?.toEmail }).exec();
    if(!customer){
        return res.status(204).json({ message: `${req?.body?.toEmail} is not exist.`});
    }

    try {
        customer.emailOTP = newOTP;
        const result = await customer.save();

        res.status(200).json(newOTP);
    } catch (error) {
        res.status(500).json(error);
    }
    
};

const compareOtpByEmail = async (req, res) => { 
    //need email, otp to check
    if(!req?.body?.email){
        return res.status(400).json({ message: 'Email is required' });
    }

    const customer = await Customer.findOne({ email: req?.body?.email }).exec();

    if(!customer){
        return res.status(204).json({ message: `${req?.body?.toEmail} is not exist.`});
    }

    //compare otp 
    if(req?.body?.otp === customer.emailOTP){
        res.status(200).json('OTP is matches');
    }
    else{
        res.status(500).json('OTP is not matches');
    }
    
};

module.exports = { handleSendOtpToEmail, compareOtpByEmail };
