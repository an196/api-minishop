const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderID: {
        type: Number,
        required: true,
    },
    customerID: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true
    },
    details: {
       type: [],
       required: false,
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    totalPayment:{
        type: Number,
        default: 0
    },
    deliveryAddress:{
        type: String,
        required: false,
    },
    status:{
        type: String,
        default: 'Pending',
    },
    date:{
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Order', orderSchema);
