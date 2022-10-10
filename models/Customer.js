const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customerID: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgProfile: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    birthday: {
        type: Date,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    joinDate: {
        type: Date,
        required: false
    },
    lastAccessAt: {
        type: Date,
        required: false
    },
    totalBill:{
        type: Number,
        default: 0,
        required: false
    },
    refreshToken: [String]
});

module.exports = mongoose.model('Customer', customerSchema);