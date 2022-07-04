const Product = require('../models/Product');

const getProducts = async (req, res) => {
    const Products = await Product.find();
    if (!Products) return res.status(204).json({ message: 'No Products found' });
    res.status(200).json(Products);
};

const addProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).join(savedProduct);
    } catch (err) {
        res.status(500).join(err);
    }
};


module.exports = {
    getProducts,
    addProduct
};
