const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');

const getCustomers = async (req, res) => {
    const customers = await Customer.find();
    if (!customers) return res.status(204).json({ message: 'No customers found' });
    res.json(customers);
};

const getCustomer = async (req, res) => {
  
    if(req.params?._id)
        res.status(204).json({ message: '_id is required' });
    const customers = await Customer.findOne({_id: req.params?.id}).exec();
    if (!customers) return res.status(204).json({ message: 'No customers found' });
    
    const resCustomer = {
        _id: customers?._id,
        customerID:customers?.customerID,
        username:customers?.username,
        email:customers?.email,
        imgProfile:customers?.imgProfile,
        country:customers?.country,
        joinDate:customers?.joinDate,
        lastAccessAt:customers?.lastAccessAt,
        totalBill:customers?.totalBill,
        birthday:customers?.birthday,
        gender:customers?.gender,
        phone:customers?.phone,
    }
    res.json(resCustomer);
};


const addCustomer = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email)
        return res.status(400).json({ message: 'Username, email and password are required.' });

    // check for duplicate usernames in the db
    const duplicateCustomer = await Customer.findOne({ username: username }).exec();
    if (duplicateCustomer) return res.sendStatus(409); //Conflict

    // check for duplicate email in the db
    const duplicateEmail = await Customer.findOne({ email: email }).exec();
    if (duplicateEmail) return res.sendStatus(409); //Conflict

    try {
        //get last customerID
        const lastCustomer = await Customer.find().sort({ field: 'asc', customerID: -1 }).limit(1);
        const newCode = lastCustomer[0] ? lastCustomer[0].customerID + 1 : 1;

        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await Customer.create({
            customerID: Number(newCode),
            username: username,
            email: email,
            password: hashedPwd,
            imgProfile: req.body?.imgProfile || '',
            country: req.body?.country || '',
            joinDate: new Date(),
            lastAccessAt: new Date(),
            totalBill: 0,
            address: req.body?.address || '',
        });

        res.status(201).json({ success: `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCustomer = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: 'ID parameter is required.' });
    }
    
    const customer = await Customer.findOne({ _id: req.params.id }).exec();
    
    if (!customer) {
        return res.status(204).json({ message: `No user matches ID ${req.params.id}.`});
    }
    
    try {
        customer.username = req.body?.username;
        customer.email = req.body?.email;
        // customer.password = req.body?.password;
        if(req.body?.imgProfile) customer.imgProfile = req.body?.imgProfile;
        if(req.body?.country) customer.country = req.body?.country;
        if(req.body?.lastAccessAt) customer.lastAccessAt = req.body?.lastAccessAt;
        if(req.body?.totalBill) customer.totalBill = req.body?.totalBill;
        if(req.body?.gender) customer.gender = req.body?.gender;
        if(req.body?.birthday) customer.birthday = req.body?.birthday;
        if(req.body?.phone) customer.phone = req.body?.phone;
        if(req.body?.address) customer.phone = req.body?.address;

        const result = await customer.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
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
    getCustomer,
    addCustomer,
    deleteCustomer,
    updateCustomer
};
