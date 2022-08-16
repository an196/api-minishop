const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ message: 'No employees found' });
    res.json(employees);
};

const addEmployee = async (req, res) => {
    const lastRecord = await Employee.find().sort({field: 'asc', employeeID: -1}).limit(1);
    
    const newID = lastRecord[0] ? lastRecord[0].employeeID + 1 : 1;
    const newEmployee = new Employee({employeeID: newID, ...req.body});
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
    
    if (!req?.params?.id) {
       
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
   
    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
    }

   
    try {
        employee.name = req.body.name;
        employee.email = req.body.email;
        employee.imgProfile = req.body.imgProfile;
        employee.country = req.body.country;
        employee.hireDate = req.body.hireDate;
        employee.reportTo = req.body.reportTo;
        employee.roles = req.body.roles;
        
        const result = await employee.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
};
