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
    if (!req?.body?._id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.body._id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body._id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

module.exports = {
    getAllEmployees,
    addEmployee,
    deleteEmployee,
};
