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
    details: {
        goodsID: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            default: 0,
        },
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
        required: true,
    },
    status:{
        type: String,
        default: 'Pending',
    }
});

module.exports = mongoose.model('Order', orderSchema);
