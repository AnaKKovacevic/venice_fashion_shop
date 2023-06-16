const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MONGODB_URL = require("./config/db.config");
const productRoute = require("./routes/product.route");
const categoryRoute = require("./routes/category.route");
const brandRoute = require("./routes/brand.route");
const testimonialRoute = require("./routes/testimonial.route");
const blogRoute = require("./routes/blog.route");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const orderRoute = require("./routes/order.route");

const app = express();
const portNumber = 5000;


mongoose.set("strictQuery",false);
mongoose.connect(MONGODB_URL)
        .then((data)=>{
            console.log("MongoDB is connected");
        })
        .catch((error)=>{
            console.log("Error while connecting to MongoDB");
            console.log(error);
        });

app.use(cors({
    origin: "https://venicefashionshop.onrender.com"
}));
app.options("*",cors());
app.use(express.json());



app.use("/api/product",productRoute);
app.use("/api/category",categoryRoute);
app.use("/api/brand",brandRoute);
app.use("/api/testimonial",testimonialRoute);
app.use("/api/blog",blogRoute);
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/order",orderRoute);

app.listen(portNumber,(error)=>{

    if(error){
        console.log(`Error on starting server: ${error}`);
    }else{
        console.log(`Listening to port ${portNumber}...`);
    }
})