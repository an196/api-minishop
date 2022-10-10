const nodemailer = require('nodemailer');

const sendOtpToEmail = (toEmail, otp) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_OTP}`,
            pass: `${process.env.EMAIL_OTP_PASSWORD}`,
        },
    });

    var mailOptions = {
        from: `${process.env.EMAIL_OTP}`,
        to: `${toEmail}`,
        subject: `Mã xác minh cho email khôi phục: ${otp}`,
        text: `Sử dụng mã này để hoàn tất việc thiết lập email khôi phục này: ${otp}. Mã này sẽ hết hạn sau 24 giờ.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const generateOTP = (number) => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < number; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }

    return OTP;
};

module.exports = { generateOTP, sendOtpToEmail };