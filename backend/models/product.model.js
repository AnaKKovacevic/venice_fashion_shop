const mongoose = require("mongoose");
const reviewSubdoc = require("../subdocuments/review.subdocument");

const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
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
    rating:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        required:true
    },
    brand:{
        type:Number,
        required:true
    },
    category:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images: {
        type: [String]
    },
    reviews:{
        type:[reviewSubdoc]
    }
})

const ProductModel = mongoose.model("products",productSchema);
module.exports = ProductModel;
