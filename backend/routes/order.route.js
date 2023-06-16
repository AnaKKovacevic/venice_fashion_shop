const express = require("express");
const orderRoute = express.Router();
const OrderModel = require("../models/order.model");
const stripe = require("stripe");
const secretKey = "";
const stripeObj = stripe(secretKey);
const mailTransporter = require("../services/mail.service");
const mailTemplates = require("../template/mail.template");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;


/*orderRoute.post("/init-payment",async(req,res)=>{

    let {amount,currency} = req.body;

    try{
        const paymentInit = await stripeObj.paymentIntents.create({
            amount: amount,
            currency: currency,
            automatic_payment_methods: {
                enabled: true
            }
        })
        
        res.send(paymentInit.client_secret);

    }catch(err){
        res.status(408).send(err);
    }

})*/

orderRoute.post("/create-order",(req,res)=>{

    let customerData = req.body.customer;
    if(!customerData || !customerData?.firstname || !customerData?.lastname || !customerData?.email ||
        !customerData?.phone || !customerData?.address || !customerData?.city || 
        !customerData?.postCode || !req.body.cart || !req.body.cart?.length){
            return res.status(409).send("The order data you've sent are invalid.");
    }
    OrderModel.create(req.body)
        .then((order)=>{
            OrderModel.aggregate([
                {
                    $match: {_id: order._id}
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "cart.productID",
                        foreignField: "_id",
                        as: "productsDetails"
                    }
                }
        
            ])
            .then((orderData)=>{
                let customerName = `${orderData[0].customer.firstname} ${orderData[0].customer.lastname}`;
                let tableData = "";
                let totalPrice = 0;
                let finalPrice = "";


                orderData[0].cart.forEach((product)=>{

                    let productTitle = "";
                    let pricePerProduct = product.price - product.price*product.discountPercentage;
                    let subtotalPrice = (product.price - product.price*product.discountPercentage)*product.productQuantity;
                    let finalPricePerProduct = "";
                    let finalSubtotalPrice = "";

                    if(orderData[0].currencyData.currency === "eur"){
                        finalPricePerProduct = `<span>&euro;${pricePerProduct.toFixed(2)}</span>`;
                        finalSubtotalPrice = `<span>&euro;${subtotalPrice.toFixed(2)}</span>`;
                    }else{
                        finalPricePerProduct = `<span>$${(pricePerProduct*orderData[0].currencyData.eurToUsd).toFixed(2)}</span>`;
                        finalSubtotalPrice = `<span>$${(subtotalPrice*orderData[0].currencyData.eurToUsd).toFixed(2)}</span>`;
                    }

                    orderData[0].productsDetails.forEach((productDetails)=>{
                        if(product.productID.toString() === productDetails._id.toString()){
                            productTitle = productDetails.title;
                        }
                    })
                    tableData += `
                                <tr>
                                    <td style="background-color:#f7f7f7; padding:5px;">${productTitle}</td>
                                    <td style="background-color:#f7f7f7; padding:5px;text-align:center;">${finalPricePerProduct}</td>
                                    <td style="background-color:#f7f7f7; padding:5px;text-align:center;">${product.productQuantity}</td>
                                    <td style="background-color:#f7f7f7; padding:5px;text-align:right;">${finalSubtotalPrice}</td>
                                </tr>`;
                    totalPrice += (product.price - product.price*product.discountPercentage)*product.productQuantity
                })
                if(orderData[0].currencyData.currency === "eur"){
                    finalPrice = `<span>&euro;${totalPrice.toFixed(2)}</span>`;
                }else{
                    finalPrice = `<span>$${(totalPrice*orderData[0].currencyData.eurToUsd).toFixed(2)}</span>`;
                }


                const message = mailTemplates.htmlOrder(customerName,tableData,finalPrice);
                mailTransporter.sendEmail(orderData[0].customer.email,"Order Confirmation",message)
                    .then(()=>{
                        res.send(orderData);
                    })
                    .catch((err)=>{
                        res.status(408).send("Something went wrong with displaying your order. Please contact our customer support.");
                    })

            })
            .catch((err)=>{
                res.status(408).send("Something went wrong with displaying your order. Please contact our customer support.");
            })
        })
        .catch((err)=>{
            res.status(408).send("Something went wrong. Please send the order again.");
        })
})

orderRoute.get("/get-all/:userEmail",(req,res)=>{

    OrderModel.aggregate([
        {
            $match: {"customer.email": req.params.userEmail}
        },
        {
            $lookup: {
                from: "products",
                localField: "cart.productID",
                foreignField: "_id",
                as: "productsDetails"
            }
        },
        {
            $sort: {date: -1}
        }
    ])
    .then((orders)=>{
        res.send(orders);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

orderRoute.get("/get-order/:orderId",(req,res)=>{
    OrderModel.aggregate([
        {
            $match: {_id: new ObjectId(req.params.orderId)}
        },
        {
            $lookup: {
                from: "products",
                localField: "cart.productID",
                foreignField: "_id",
                as: "productsDetails"
            }
        }
    ])
    .then((order)=>{
        res.send(order);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })

})

orderRoute.get("/count-all",(req,res)=>{
    OrderModel.countDocuments({})
    .then((count)=>{
         res.send({name:"orders",count})
     })
     .catch((err)=>{
         res.status(408).send(err);
     })
})

orderRoute.get("/dashboard/searched-count",(req,res)=>{
    let searchValue = req.query.search;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return {"customer.email" : {$regex: new RegExp(el, "i")}};
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }
    
    OrderModel.countDocuments(findCriteriumObj)
        .then((totalItemsCount)=>{
            res.send({totalItemsCount})
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

orderRoute.get("/dashboard/get-searched",(req,res)=>{
    let searchValue = req.query.search;
    let page = parseInt(req.query.page);
    let skipNum = (page-1)*30;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return {"customer.email" : {$regex: new RegExp(el, "i")}};
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }

    OrderModel.find(findCriteriumObj)
        .sort({date:-1})
        .skip(skipNum)
        .limit(30)
        .then((orders)=>{
            res.send(orders);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

module.exports = orderRoute;