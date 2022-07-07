const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');

router.route('/')
    .get(orderController.getOrders)
    .post(orderController.addOrder)
    .delete(orderController.deleteOrder);

router.route('/:id')
    .put(orderController.updateOrder)

module.exports = router;