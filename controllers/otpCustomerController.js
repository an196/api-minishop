const { generateOTP, sendOtpToEmail } = require('../helper/otp');
const Customer = require('../models/Customer');

const handleSendOtpToEmail = async (req, res) => {
    if (!req?.body?.toEmail) return res.status(400).json({ message: 'Email received is required' });

    const newOTP = generateOTP(6);
    //sendOtpToEmail(req.body.toEmail, newOTP);
    //res.status(200).json({ message: 'OTP has sent to email' });

    const customer = await Customer.findOne({ email: req?.body?.toEmail }).exec();
    if (customer) {
        return res.status(204).json({ message: `Email has existed.` });
    }

    const updateCustomer = await Customer.findOne({ _id: req?.body?._id }).exec();
    console.log('has customer', updateCustomer);
    if (updateCustomer) {
        try {
            updateCustomer.emailOTP = newOTP;
            updateCustomer.emailRechange = req.body.toEmail;
            const result = await updateCustomer.save();

            res.status(200).json(newOTP);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

const compareOtpByEmail = async (req, res) => {
    //need email, otp to check
    if (!req?.body?.email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const customer = await Customer.findOne({ email: req?.body?.email }).exec();

    if (customer) {
        return res.status(204).json({ message: `${req?.body?.toEmail} is exist.` });
    }
    const updateCustomer = await Customer.findOne({ _id: req?.body?._id }).exec();

    //compare otp
    if (updateCustomer && req?.body?.otp === updateCustomer.emailOTP) {
        updateCustomer.email = updateCustomer.emailRechange;
        try {
            const result = await updateCustomer.save();
            res.status(200).json('New email is changed');
        } catch {
            res.status(500).json('Can not change email!');
        }
    } else {
        res.status(500).json('OTP is not matches');
    }
};

module.exports = { handleSendOtpToEmail, compareOtpByEmail };
