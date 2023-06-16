import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : [],
    totalQuantity: 0,
    totalPrice: 0
};

const cartSlicer = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state,action){
            let addedProductInfoObj = action.payload;
            let addedProductObj = addedProductInfoObj.product;
            let addedProductQuantity = addedProductInfoObj.productQuantity;

            let productIndex = state.products.findIndex((el)=>{
                return el.product._id === addedProductObj._id;
            });

            let finalPrice = addedProductObj.price - addedProductObj.price * addedProductObj.discountPercentage;

            if(productIndex > -1){
                state.products[productIndex].productQuantity += addedProductQuantity;
            }else{
                state.products.push(addedProductInfoObj);
            }

            state.totalQuantity += addedProductQuantity;
            state.totalPrice += finalPrice * addedProductQuantity;

            localStorage.setItem("vf_cart",JSON.stringify(state));
        },
        removeFromCart(state,action){
            let deletedProductObj = action.payload.product;
            let deletedProductQuantity = action.payload.productQuantity;

            let productIndex = state.products.findIndex((el)=>{
                return el.product._id === deletedProductObj._id;
            });

            let finalPrice = deletedProductObj.price - deletedProductObj.price * deletedProductObj.discountPercentage;


            state.products.splice(productIndex,1);
            state.totalQuantity -= deletedProductQuantity;
            state.totalPrice -= finalPrice * deletedProductQuantity;

            if(state.totalQuantity === 0){
                state.totalPrice = 0;
            }

            localStorage.setItem("vf_cart",JSON.stringify(state));
        },
        resetCart(state){
            state.products = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;

            localStorage.removeItem("vf_cart");
        },
        setCartFromLocalStorage(state,action){
            let dataFromLocalStorage = action.payload;
            state.products = dataFromLocalStorage.products;
            state.totalQuantity = dataFromLocalStorage.totalQuantity;
            state.totalPrice = dataFromLocalStorage.totalPrice;
        }
    }
});

export const {addToCart,removeFromCart,resetCart,setCartFromLocalStorage} = cartSlicer.actions;
export default cartSlicer.reducer;

