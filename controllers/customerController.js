const Customer = require('../models/Customer');

const getCustomers = async (req, res) => {
    const customers = await Customer.find();
    if (!customers) return res.status(204).json({ message: 'No customers found' });
    res.json(customers);
};

const addCustomer = async (req, res) => {
    const newCustomer = new Customer(req.body);
    try {
        const savedCustomer = await newCustomer.save();
        res.status(200).json(savedCustomer);
    } catch (err) {
        res.status(500).json(err);
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
