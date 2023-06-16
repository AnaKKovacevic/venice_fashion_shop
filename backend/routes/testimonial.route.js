const express = require("express");
const testimonialRoute = express.Router();
const TestimonialModel = require("../models/testimonial.model");

testimonialRoute.get("/get-all",(req,res)=>{
    TestimonialModel.find({})
    .then((testimonials)=>{
        res.send(testimonials);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
});

module.exports = testimonialRoute;
