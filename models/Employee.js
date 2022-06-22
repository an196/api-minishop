const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employeeID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
        Employee: {
            type: Number,
            default: 1000
        },
    },
    imgProfile: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    hireDate: {
        type: Date,
        required: false
    },
    reportTo:{
        type: String,
        required: false
    }
    
});

module.exports = mongoose.model('Employee', employeeSchema);