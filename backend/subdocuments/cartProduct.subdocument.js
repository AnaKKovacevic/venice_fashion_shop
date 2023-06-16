const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    discountPercentage:{
        type:Number,
        required:true
    },
    productQuantity: {
        type: Number,
        required: true
    }
})

module.exports = cartProductSchema;