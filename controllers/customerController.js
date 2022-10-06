const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');

const getCustomers = async (req, res) => {
    const customers = await Customer.find();
    if (!customers) return res.status(204).json({ message: 'No customers found' });
    res.json(customers);
};

const addCustomer = async (req, res) => {
    const { name, password, email } = req.body;
    if (!name || !password || !email) return res.status(400).json({ 'message': 'Username, email and password are required.' });

     // check for duplicate usernames in the db
     const duplicateCustomer = await Customer.findOne({ name: name }).exec();
     if (duplicateCustomer) return res.sendStatus(409); //Conflict 
 
      // check for duplicate email in the db
      const duplicateEmail = await Customer.findOne({ email: email }).exec();
      if (duplicateEmail) return res.sendStatus(409); //Conflict 

    try {
        //get last customerID
        const lastCustomer = await Customer.find().sort({field: 'asc', customerID: -1}).limit(1);
        const newCode = lastCustomer[0] ? lastCustomer[0].customerID + 1 : 1;

        console.log(lastCustomer)
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await Customer.create({
            "customerID": Number(newCode),
            "name": name,
            "email": email,
            "password": hashedPwd
        });
        console.log(result);

        res.status(201).json({ 'success': `New user ${name} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json('Customer has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
};
module.exports = {
    getCustomers,
    addCustomer,
    deleteCustomer,
};
