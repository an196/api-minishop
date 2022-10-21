const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    image: {
        type: String,
        require: true,
    },
    item: {
        type: Object,
        require: true,
    },
    buttonText: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    smallText: {
        type: String,
        require: true,
    },
    middleText: {
        type: String,
        require: true,
    },
    largeText1: {
        type: String,
        require: true,
    },
    largeText2: {
        type: String,
        require: true,
    },
    discount: {
        type: String,
        require: true,
    },
    saleTime:{
        type: Date,
        require: true,
    },
    updateAt:{
        type: Date,
    }
})


module.exports = mongoose.model('Banner', bannerSchema);