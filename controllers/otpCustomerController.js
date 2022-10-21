const { generateOTP, sendOtpToEmail } = require('../helper/otp');
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');

const handleSendOtpToEmail = async (req, res) => {
    if (!req?.body?.toEmail) return res.status(400).json({ message: 'Email received is required' });

    const newOTP = generateOTP(6);
    sendOtpToEmail(req.body.toEmail, newOTP);
    res.status(200).json({ message: 'OTP has sent to email' });

    const customer = await Customer.findOne({ email: req?.body?.toEmail }).exec();
    if (customer) {
        return res.status(209).json({ message: `Email has existed.` });
    }

    const updateCustomer = await Customer.findOne({ _id: req?.body?._id }).exec();
    if (updateCustomer) {
        try {
            updateCustomer.OTP = newOTP;
            updateCustomer.rechange = req.body.toEmail;
            const result = await updateCustomer.save();

            //res.status(200).json(newOTP);
        } catch (error) {
            //res.status(500).json(error);
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
        return res.status(209).json({ message: `${req?.body?.toEmail} is exist.` });
    }
    const updateCustomer = await Customer.findOne({ _id: req?.body?._id }).exec();

    console.log(updateCustomer.OTP);
    //compare otp
    if (updateCustomer && req?.body?.otp === updateCustomer.OTP) {
        updateCustomer.email = updateCustomer.rechange;
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

const handleSendOtpToChangePassword = async (req, res) => {
    //field requied is _id, password_rechange
    if (!req?.body?._id) return res.status(400).json({ message: 'id user is required' });
    if (!req?.body?.passwordRechange) return res.status(400).json({ message: 'Password rechange is required' });

    //check user hass existed
    const customer = await Customer.findOne({ _id: req?.body?._id }).exec();
    if (!customer) {
        return res.status(204).json({ message: `Email has not existed.` });
    }

    const newOTP = generateOTP(6);
    const hashedPwd = await bcrypt.hash(req.body.passwordRechange, 10);
    sendOtpToEmail(customer.email, newOTP);
    res.status(200).json({ message: 'OTP has sent to email' });

    try {

        customer.OTP = newOTP;
        customer.rechange = hashedPwd;
        const result = await customer.save();
        
        //res.status(200).json(newOTP);
    } catch (error) {
        //res.status(500).json(error);
    }
};

const compareOtpByPassword = async (req, res) => {
    //need otp to check, _id
    if (!req?.body?._id) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const customer = await Customer.findOne({ _id: req?.body?._id }).exec();

    if (!customer) {
        return res.status(204).json({ message: `${req?.body?._id} is not exist.` });
    }

    //compare otp
    if (req.body?.status === 'OTP_TRUE') {
        customer.password = customer.rechange;
        try {
            const result = await customer.save();
            res.status(200).json('New password is changed');
        } catch {
            res.status(500).json('Can not change password!');
        }
    } else {
        res.status(500).json('OTP is not matches');
    }
};

module.exports = { handleSendOtpToEmail, compareOtpByEmail, handleSendOtpToChangePassword, compareOtpByPassword };
