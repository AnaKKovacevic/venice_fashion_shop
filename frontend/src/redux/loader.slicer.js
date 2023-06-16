import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showFirstCriterium: false,
    showSecondCriterium: false,
    starterLoader: {
        navLinksWomen: false,
        navLinksMen: false,
        navLinksAll: false,
        promotedCats: false,
        topProducts: false,
        testimonial: false,
        blog: false
    }
}

const loaderSlicer = createSlice({
    name: "loader",
    initialState: initialState,
    reducers: {
        toggleLoader(state,action){
            state.showFirstCriterium = action.payload.showFirstCriterium;
            state.showSecondCriterium = action.payload.showSecondCriterium;
        },
        toggleLoaderFilterCheckbox(state){
            state.showFirstCriterium = false;
        },
        toggleLoaderFilterProducts(state){
            state.showSecondCriterium = false;
        },
                toggleStarterLoader(state,action){
            state.starterLoader[action.payload.sectionName] = true;
        },
        resetToggleStarterLoader(state){
            state.starterLoader.navLinksWomen = false;
            state.starterLoader.navLinksMen = false;
            state.starterLoader.navLinksAll = false;
            state.starterLoader.promotedCats = false;
            state.starterLoader.topProducts = false;
            state.starterLoader.testimonial = false;
            state.starterLoader.blog = false;
        }
    }
})

export const {toggleLoader,toggleLoaderFilterCheckbox,toggleLoaderFilterProducts,toggleStarterLoader,resetToggleStarterLoader} = loaderSlicer.actions;
export default loaderSlicer.reducer;