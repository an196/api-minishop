const Category = require('../models/Category');

const getCategories = async (req, res) => {
    const categories = await Category.find();
    if (!categories) return res.status(204).json({ message: 'No categories found' });
    res.json(categories);
};

const addCategory = async (req, res) => {
    const lastCategory = await Category.find().sort({ field: 'asc', code: -1}).limit(1);
    const newCode = lastCategory[0] ? lastCategory[0].code + 1 : 1;
    const newCategory = new Category({ code:newCode, ...req.body});
   
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteCategory = async (req, res) => {
   
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Category ID required.' });

    const category = await Category.findOne({ _id: req.body.id }).exec();
    if (!category) {
        return res.status(204).json({ "message": `No category matches ID ${req.body.id}.` });
    }
    const result = await category.deleteOne(); //{ _id: req.body.id }
    res.status(200).json(result);
    console.log('delete successfully')
}

const updateCategory = async (req, res) => {
    
    if (!req?.params?.id) {
       
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
   
    const category = await Category.findOne({ _id: req.params.id }).exec();
    if (!category) {
        return res.status(204).json({ "message": `No category matches ID ${req.params.id}.` });
    }

   
    try {
        category.name = req.body.name;
        category.code = req.body.code;
        const result = await category.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getCategories,
    addCategory,
    deleteCategory,
    updateCategory
};
