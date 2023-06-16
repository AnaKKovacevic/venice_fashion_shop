import axios from "axios";
import { getCartTotalPrice } from "./product.service";

//export const initPayment = (data) => axios.post("/order/init-payment",data);
export const createOrder = (payload) =>axios.post("/order/create-order",payload);
export const getUserOrders = (userEmail)=>axios.get(`/order/get-all/${userEmail}`);
export const getUserOrder = (orderId)=>axios.get(`/order/get-order/${orderId}`);
export const getAllOrders = ()=>axios.get("/order/count-all");
export const getDashboardOrdersCount = (queryString)=>axios.get(`/order/dashboard/searched-count?${queryString}`);
export const getDashboardOrders = (queryString)=>axios.get(`/order/dashboard/get-searched?${queryString}`);

export const getShortDate = (date)=>{

    const monthsArr = ["January", "February", "March", 
    "April", "May", "June", "July", "August", "September", 
    "October", "November", "December"];

    let dateString = "";

        let indexEnd = date.indexOf("T");
        let dateShort = date.slice(0,indexEnd);
        let longDate = new Date(dateShort);
        dateString = `${monthsArr[longDate.getMonth()]} ${longDate.getDate()}, ${longDate.getFullYear()}`;


    return dateString;
}

export const getTotalOrderQuantity = (order)=>{
    let quantity = 0;

    order?.cart.forEach((product)=>{
        quantity += product.productQuantity;
    })

    return quantity;
}

export const getTotalOrderPrice = (order)=>{
    let totalPrice = 0;

    order.cart.forEach((product)=>{
        totalPrice += (product.price - (product.price*product.discountPercentage))*product.productQuantity;
    })

    return getCartTotalPrice(totalPrice,order.currencyData);
}
