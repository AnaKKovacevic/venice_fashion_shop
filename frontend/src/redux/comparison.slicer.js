import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productsCompared : []
}

const comparisonSlicer = createSlice({
    name: "comparison",
    initialState: initialState,
    reducers: {
        addProductForComparison(state,action){
            state.productsCompared.push(action.payload);
        },
        deleteProductFromComparison(state,action){

            let productPosition = state.productsCompared.findIndex((product)=>{

                return product._id === action.payload._id;
            })
            state.productsCompared.splice(productPosition,1);
        },
        setComparedProductsFromLocalStorage(state,action){
            state.productsCompared = action.payload;
        }
    }
})

export const {addProductForComparison, deleteProductFromComparison,setComparedProductsFromLocalStorage} = comparisonSlicer.actions;
export default comparisonSlicer.reducer;