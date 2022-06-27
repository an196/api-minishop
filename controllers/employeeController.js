const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ message: 'No employees found' });
    res.json(employees);
};

const addEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        res.status(200).json(savedEmployee);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteEmployee = async (req, res) => {
   
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    res.status(200).json(result);
    console.log('delete successfully')
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

module.exports = {
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
};
