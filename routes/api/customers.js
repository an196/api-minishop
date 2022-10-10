const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customerController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(customerController.getCustomers)
    .post(customerController.addCustomer)
    .delete(customerController.deleteCustomer)

router.route('/:id')
    .put(customerController.updateCustomer)
module.exports = router;