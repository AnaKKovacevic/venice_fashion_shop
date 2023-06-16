const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    postedAt : {
        type : Date,
        default : ()=>new Date()
    },
    readingTime : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    },
    textShort : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    }
})

const BlogModel = mongoose.model("blogs", BlogSchema);
module.exports = BlogModel;