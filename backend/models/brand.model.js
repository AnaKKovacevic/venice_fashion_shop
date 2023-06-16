const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brandNum: {
        type: Number,
        required:true
    },
    thumbnail: {
        type: String,
        required: true
    }
});

const BrandModel = mongoose.model("brands",brandSchema);
module.exports = BrandModel;