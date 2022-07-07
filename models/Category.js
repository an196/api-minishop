const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    code: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    } 
})

module.exports = mongoose.model('Category', categorySchema);