const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
})

module.exports = mongoose.model('Product', productSchema);