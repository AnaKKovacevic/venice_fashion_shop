import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    men : [],
    women : []
};

const categorySlicer = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        saveCategoryMen(state,action){
            state.men = action.payload;
        },
        saveCategoryWomen(state,action){
            state.women = action.payload;
        }
    }
})

export const {saveCategoryMen,saveCategoryWomen} = categorySlicer.actions;
export default categorySlicer.reducer;