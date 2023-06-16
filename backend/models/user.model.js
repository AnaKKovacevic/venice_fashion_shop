const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isActive: {
        type:Boolean,
        default: false
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    wishlist: {
        type: [String]
    }
})

const UserModel = mongoose.model("users",userSchema);
module.exports = UserModel;