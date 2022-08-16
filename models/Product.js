const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    goodsID: {
        type: Number,
        reqiured: true
    },
    image: [{
        type: String,
        require: true
    }],
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    },
    goodsReceipts: {
        type: String,
    },
    category: {
        type: Number,
    },
    amount: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('Product', productSchema);