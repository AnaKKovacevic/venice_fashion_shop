const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    reviewText : {
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required:true
    },
    userName:{ 
        type:String,
        required:true
    },
    writtenAt:{
        type : Date,
        default : ()=>new Date()
    },
    userID:{
        type: mongoose.Schema.ObjectId,
        required: true
    }
})


module.exports = reviewSchema;