const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const cookies = req.cookies;

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Customername and password are required.' });

    const foundCustomer = await Customer.findOne({ email: email }).exec();

    if (!foundCustomer) return res.sendStatus(401); //Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundCustomer.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                CustomerInfo: {
                    username: foundCustomer.username,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '600s' },
        );
        const newRefreshToken = jwt.sign({ username: foundCustomer.username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '120s',
        });

        // Changed to let keyword
        let newRefreshTokenArray = !cookies?.jwt
            ? foundCustomer.refreshToken
            : foundCustomer.refreshToken.filter((rt) => rt !== cookies.jwt);

        if (cookies?.jwt) {
            /* 
        Scenario added here: 
            1) Customer logs in but never uses RT and does not logout 
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */
            const refreshToken = cookies.jwt;
            const foundToken = await Customer.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundCustomer.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundCustomer.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Send authorization and information of user and access token to user
        const user = {
            _id: foundCustomer._id,
            customerID: foundCustomer.customerID,
            username: foundCustomer.username,
            email: foundCustomer.email,
            imgProfile: foundCustomer.imgProfile,
            country: foundCustomer.country,
            joinDate: foundCustomer.joinDate,
            lastAccessAt: foundCustomer.lastAccessAt,
            totalBill: foundCustomer.totalBill,
            phone: foundCustomer.phone,
            birthday: foundCustomer.birthday,
            gender: foundCustomer.gender,
        };

        res.json({ user, accessToken });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { handleLogin };
