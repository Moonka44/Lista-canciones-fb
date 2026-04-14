import { createSlice } from "@reduxjs/toolkit";


const cancionSlice = createSlice({
    name: "canciones",
    initialState: {
        canciones: [],
        loader: false,
    },
    reducers: {
        setCanciones: (state, action) => {
            state.canciones = action.payload;
        },
        addCancion: (state, action) => {
            state.canciones = [...state.canciones, action.payload];
        },
        updateCancion: (state, action) => {
            const index = state.canciones.findIndex((cancion) => cancion.id === action.payload.id);
            if(index !== -1) state.canciones[index] = action.payload;
            
        },

        deleteCancion: (state, action) => {
            state.canciones = state.canciones.filter((cancion) => cancion.id !== action.payload.id);
        }
    },
});

export const { setCanciones, addCancion, updateCancion, deleteCancion } = cancionSlice.actions;
export default cancionSlice.reducer;