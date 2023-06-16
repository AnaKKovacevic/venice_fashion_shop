const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    categoryNum : {
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    promoted:{
        type: Boolean,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    }
})

const CategoryModel = mongoose.model("categories",categorySchema);
module.exports = CategoryModel;