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
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json('Employee has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
};
module.exports = {
    getAllEmployees,
    addEmployee,
    deleteEmployee,
};
