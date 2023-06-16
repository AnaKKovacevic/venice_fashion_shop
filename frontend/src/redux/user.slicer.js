import {createSlice} from "@reduxjs/toolkit";

const initialState = {user:null};

const userSlicer = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        saveUser(state,action){
            state.user = action.payload;
        },
        removeUser(state){
            state.user = null;
            localStorage.removeItem("vf_user");
            localStorage.removeItem("vf_token");
        }
    }
})

export const {saveUser,removeUser} = userSlicer.actions;
export default userSlicer.reducer;