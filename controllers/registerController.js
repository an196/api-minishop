const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) return res.status(400).json({ 'message': 'Username, email and password are required.' });

    // check for duplicate usernames in the db
    const duplicateUsername = await User.findOne({ username: username }).exec();
    if (duplicateUsername) return res.sendStatus(409); //Conflict 

     // check for duplicate email in the db
     const duplicateEmail = await User.findOne({ email: email }).exec();
     if (duplicateEmail) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "username": username,
            "email": email,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };