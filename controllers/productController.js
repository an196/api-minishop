const Product = require('../models/Product');

const getProducts = async (req, res) => {
    const Products = await Product.find();
    if (!Products) return res.status(204).json({ message: 'No Products found' });
    res.status(200).json(Products);
};

const findProducts = async (req, res) => {
    const searchPatten  = req.query.p;
    const products = await Product.find({ name: new RegExp(searchPatten, 'i')});
    if (!products) return res.status(204).json({ message: 'No Products found' });
    res.status(200).json(products);
    console.log(`searchPatten:: ${ JSON.stringify(searchPatten) }`)
};

const getProductsbyCategory = async (req, res) => {
    const category  = req?.params?.id;
    console.log(category)
    if (!category) return res.status(400).json({ message: 'Category ID required.' });
    const products = await Product.find({ category: Number(category)});
    if (!products) return res.status(204).json({ message: 'No Products found' });
    res.status(200).json(products);
};

const addProduct = async (req, res) => {
    const lastRecord = await Product.find().sort({ field: 'asc', goodsID: -1 }).limit(1);

    const newID = lastRecord[0] ? lastRecord[0].goodsID + 1 : 1;
    const newProduct = new Product({ goodsID: newID, ...req.body });

    newProduct
        .save()
        .then(
            (data) => res.status(200).json(data),
            (err) => res.status(500).join(err),
        )
        .catch((err) => {
            res.status(500).join(err);
        });
};

const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: 'Product ID required' });
    Product.findOne({ _id: req.params.id })
        .exec()
        .then(
            (result) => res.status(200).json(result),
            (err) => res.status(204).json({ message: `Product ID ${req.params.id} not found` }),
        )
        .catch((err) => res.status(204).json({ message: `Product ID ${req.params.id} not found` }));
};

const updateProduct = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: 'ID parameter is required.' });
    }

    const product = await Product.findOne({ _id: req.params.id }).exec();

    if (!product) {
        return res.status(204).json({ message: `No product matches ID ${req.params.id}.` });
    }
    try {
        product.name = req.body?.name;
        product.image = req.body?.image;
        product.price = req.body?.price;
        product.details = req.body?.details;
        product.goodsReceipts = req.body?.goodsReceipts;
        product.category = req.body?.category;
        product.amount = req.body?.amount;

        const result = await product.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteProduct = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ message: 'Product ID required.' });

    const product = await Product.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(204).json({ message: `No product matches ID ${req.body.id}.` });
    }
    const result = await product.deleteOne(); //{ _id: req.body.id }
    res.status(200).json(result);
};

module.exports = {
    getProducts,
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    findProducts,
    getProductsbyCategory,
};
