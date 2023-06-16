import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currency: "eur",
    eurToUsd: 0
};

const currencySlicer = createSlice({
    name: "currency",
    initialState: initialState,
    reducers: {
        saveCurrency(state,action){
            state.currency = action.payload;
        },
        saveEurConversion(state,action){
            state.eurToUsd = action.payload;
        }
    }
});

export const {saveCurrency,saveEurConversion} = currencySlicer.actions;
export default currencySlicer.reducer;