
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import cancionSlice from "./cancion/cancionSlice";

const store = configureStore({
    reducer: {
        auth: authSlice, 
        canciones: cancionSlice
    },
});

export default store;



