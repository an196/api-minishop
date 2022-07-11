const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.addEmployee)
    .delete(employeeController.deleteEmployee);

router.route('/:id')
    .put(employeeController.updateEmployee)
module.exports = router;