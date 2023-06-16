const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true
    }
})

const TestimonialModel = mongoose.model("testimonials", testimonialSchema);
module.exports = TestimonialModel;