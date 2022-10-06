const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

router.route('/')
    .get(productController.getProducts)
    .post(productController.addProduct)
    .delete(productController.deleteProduct)

router.route('/search')  
    .get(productController.findProducts)

router.route('/category/:id')  
    .get(productController.getProductsbyCategory) 
    
router.route('/:id')
    .get(productController.getProduct)
    .put(productController.updateProduct)


module.exports = router;