const Product = require('../models/Product');

const getProducts = async (req, res) => {
    const Products = await Product.find();
    if (!Products) return res.status(204).json({ message: 'No Products found' });
    res.json(Products);
};

module.exports = {
    getProducts,
};
