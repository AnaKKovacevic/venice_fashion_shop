const mongoose = require("mongoose");
const cartProductSchema = require("../subdocuments/cartProduct.subdocument");

const orderSchema = new mongoose.Schema({
    customer:{
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        postCode:{
            type: String,
            required: true
        }
    },
    currencyData:{
        currency: {
            type: String,
            required: true
        },
        eurToUsd: {
            type: Number,
            required: true
        }
    },
    date: {
        type : Date,
        default : ()=>new Date()
    },
    cart: [cartProductSchema]
})

const OrderModel = mongoose.model("orders",orderSchema);
module.exports = OrderModel;