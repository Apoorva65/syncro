import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    loading : false,
    error : null,
    initialized: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart :(state) => {
            state.loading = true;
            state.error = null;
        },

        authSuccess: (state,action) => {
            state.user = action.payload;
            state.loading = false;
            state.initialized = true;
        },
        authFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false
        },
        logout: (state) =>{
            state.user = null;
            state.initialized = true;
        }
    }
});

export const {authStart,authSuccess,authFailure,logout} = authSlice.actions;

export default authSlice.reducer;