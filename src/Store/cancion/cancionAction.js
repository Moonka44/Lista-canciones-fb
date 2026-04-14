import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Config/FirebaseConfig";
import { collection, query, where, orderBy, onSnapshot, doc, addDoc, serverTimestamp, updateDoc, deleteDoc } from "firebase/firestore";
import { setCanciones, addCancion } from "./cancionSlice";

/*export const getCanciones = createAsyncThunk(
  "cancion/getCanciones",
  async (searchQuery, { dispatch }) => {
    try {
      const cancionesCollection = collection(db, "canciones");
      let cancionesQuery = query(cancionesCollection, orderBy("createdAt", "desc"));
      if (searchQuery) {
        cancionesQuery = query(cancionesCollection, where("nombre", "==", searchQuery));
      }

      onSnapshot(cancionesQuery, (snapshot) => {
        const canciones = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setCanciones(canciones));
      });
    } catch (error) {
      console.log(error.message);
    }
  }
);*/


export const getCanciones = createAsyncThunk(
  "cancion/getCanciones",
  async (searchQuery, { dispatch }) => {
    try {
      const cancionesCollection = collection(db, "canciones");

      
      if (!searchQuery) {
        const cancionesQuery = query(cancionesCollection, orderBy("createdAt", "desc"));
        onSnapshot(cancionesQuery, (snapshot) => {
          const canciones = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(setCanciones(canciones));
        });
        return;
      }

     
      const q1 = query(cancionesCollection, where("nombre", "==", searchQuery));
      const q2 = query(cancionesCollection, where("artista", "==", searchQuery));
      const q3 = query(cancionesCollection, where("genero", "==", searchQuery));
      const q4 = query(cancionesCollection, where("album", "==", searchQuery));
      const q5 = query(cancionesCollection, where("anio", "==", searchQuery));

      onSnapshot(q1, (snap1) => {
        onSnapshot(q2, (snap2) => {
          onSnapshot(q3, (snap3) => {
            onSnapshot(q4, (snap4) => {
              onSnapshot(q5, (snap5) => {

                const results = [
                  ...snap1.docs.map((d) => ({ id: d.id, ...d.data() })),
                  ...snap2.docs.map((d) => ({ id: d.id, ...d.data() })),
                  ...snap3.docs.map((d) => ({ id: d.id, ...d.data() })),
                  ...snap4.docs.map((d) => ({ id: d.id, ...d.data() })),
                  ...snap5.docs.map((d) => ({ id: d.id, ...d.data() })),
                ];

                const unique = Object.values(
                  results.reduce((acc, cancion) => {
                    acc[cancion.id] = cancion; // evita duplicados
                    return acc;
                  }, {})
                );
                

                dispatch(setCanciones(unique));
              });
            });
          });
        });
      });

    } catch (error) {
      console.log(error.message);
    }
  }
);


//codigo para agregar canciones

export const addCanciones = createAsyncThunk(
  "cancion/addCancion",
  async ({ nombre, artista, genero, album, anio, link }, { rejectWithValue }) => {
    try {
      if (!nombre || !artista || !genero || !album || !anio || !link) {
        return rejectWithValue("Faltan campos por llenar");
      }
      await addDoc(collection(db, "canciones"), {
        nombre,
        artista,
        genero,
        album,
        anio,
        link,
        createdAt: serverTimestamp(),
      });

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//codigo para editar canciones

export const updateCancion = createAsyncThunk(
  "cancion/updateCancion",
  async ({ id, nombre, artista, genero, album, anio, link }, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Falta ID de canción");
      }
      await updateDoc(doc(db, "canciones", id), {
        nombre,
        artista,
        genero,
        album,
        anio,
        link,
      });

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }

);

//funcion para borrrar
export const deleteCancion = createAsyncThunk(
  "cancion/deleteCancion",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Falta ID de canción");
      }
      await deleteDoc(doc(db, "canciones", id));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }

);


