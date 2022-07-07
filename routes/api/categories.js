const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');

router.route('/')
    .get(categoryController.getCategories)
    .post(categoryController.addCategory)
    .delete(categoryController.deleteCategory);

router.route('/:id')
    .put(categoryController.updateCategory)

module.exports = router;