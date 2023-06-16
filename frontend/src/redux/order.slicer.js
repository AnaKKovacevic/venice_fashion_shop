import { createSlice } from "@reduxjs/toolkit";

const orderSlicer = createSlice({
    name: "order",
    initialState: {
        order: null
    },
    reducers: {
        saveOrder(state,action){
            state.order = action.payload;

            localStorage.setItem("vf_order",JSON.stringify(state));
        },

        resetOrder(state){
            state.order = null;            
            localStorage.removeItem("vf_order");
        },
        setOrderFromLocalStorage(state,action){
            state.order = action.payload;
        }
    }
});

export const {saveOrder,resetOrder,setOrderFromLocalStorage} = orderSlicer.actions;
export default orderSlicer.reducer;

/* The commented code is used with stripe
const orderSlicer = createSlice({
    name: "order",
    initialState: {
        order: {
            customer: null,
            currencyData: null,
            cart: null    
        },
        createOrderDatabase: false
   
    },
    reducers: {
        saveOrder(state,action){
            state.order.customer = action.payload.customer;
            state.order.currencyData = action.payload.currency;

            let newCartArr = [];

            if(action.payload.cart.products?.length){
                newCartArr = action.payload.cart.products.map((el)=>{
                    return(
                        {
                            productID: el.product._id,
                            price: el.product.price,
                            discountPercentage: el.product.discountPercentage,
                            productQuantity: el.productQuantity
                        }
                    );
                });
            }

            state.order.cart = newCartArr;

            localStorage.setItem("vf_order",JSON.stringify(state));
        },
        allowOrderDatabaseInsertion(state){
            state.createOrderDatabase = true;
            localStorage.setItem("vf_order",JSON.stringify(state));
        },
        resetOrder(state){
            state.order.customer = null;
            state.order.currencyData = null;
            state.order.cart = null;
            state.createOrderDatabase = false;
            
            localStorage.removeItem("vf_order");
        },
        setOrderFromLocalStorage(state,action){
            let dataFromLocalStorage = action.payload;
            state.order.customer = dataFromLocalStorage.order.customer;
            state.order.currencyData = dataFromLocalStorage.order.currencyData;
            state.order.cart = dataFromLocalStorage.order.cart;
            state.createOrderDatabase = dataFromLocalStorage.createOrderDatabase;
        }
    }
});

export const {saveOrder,allowOrderDatabaseInsertion,resetOrder,setOrderFromLocalStorage} = orderSlicer.actions;
export default orderSlicer.reducer;
*/