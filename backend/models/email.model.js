const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    msg:{
        type: String,
        required: true
    }
})

const EmailModel = mongoose.model("emails",emailSchema);
module.exports = EmailModel;