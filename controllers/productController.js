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

const getProduct = async (req, res) => {
    console.log(req?.params)
    if (!req?.params?.id) return res.status(400).json({ "message": 'Product ID required' });
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ 'message': `Product ID ${req.params.id} not found` });
    }
    res.status(200).json(product);
}


module.exports = {
    getProducts,
    addProduct,
    getProduct
};
