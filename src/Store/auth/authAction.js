import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../../Config/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { setUser, setLoader, clearUser } from "./authSlice";    

 //funcion para crear usuario
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { dispatch }) => {  
    try {
      dispatch (setLoader(true));
      const  user  = await createUserWithEmailAndPassword(auth, email, password);

      if (user.user) {
        const userRef = doc(db, "users", user?.user?.uid);
        await setDoc(userRef, {
          email,
        });
        dispatch (setLoader(false));
      }
    } catch (error) {
      console.error("Signup error:", error);
      dispatch(setLoader(false));
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { dispatch }) => {  
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, "users", user.uid);
      const userData = await getDoc(userDocRef);
      if (userData.exists()) {
        dispatch(setUser({ id: userData.id, ...userData.data() }));
      }
    } catch (error) {
      console.error("Signup error:", error);
      dispatch(setLoader(false));
    }
  }
);

export const signout = createAsyncThunk(
  "auth/signout",
  async (_,{dispatch}) => {  
    try {
      await signOut(auth)
      .then(() => {
        dispatch(clearUser());
      }).catch((error) =>{
        console.error(error.message);
      })
    } catch (error) {
      console.error(error.message);
    }
  }
);