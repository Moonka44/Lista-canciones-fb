import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState: {user: null, loader: false},
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoader } = authSlice.actions;
export default authSlice.reducer;