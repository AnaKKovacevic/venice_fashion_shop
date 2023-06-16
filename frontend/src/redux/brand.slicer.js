import {createSlice} from "@reduxjs/toolkit";

const initialState = {brand : []}

const brandSlicer = createSlice({
    name : "brand",
    initialState: initialState,
    reducers: {
        saveBrand(state,action){
            state.brand = action.payload
        }
    }
})

export const {saveBrand} = brandSlicer.actions;
export default brandSlicer.reducer;