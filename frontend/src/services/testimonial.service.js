import axios from "axios";

export const getTestimonials = ()=>axios.get("/testimonial/get-all");