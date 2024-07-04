import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import { db, auth } from "./firestore";
  
  // Create a User (Register)
  export const getSignup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, data: userCredential };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
  // SignInWithEmailAndPassword
  export const getSignin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: userCredential };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
  // Google Signin
  export const googleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      // Save the user information in the database
      const user = result.user;
      await saveUserData(user);
  
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  //Signout function
  export const doSignOut = () => {
    window.location.replace('/');
    return auth.signOut();
  };
  
  // Utility function to save the user information in the database for google authentication
  export const saveUserData = async (user) => {
    try {
      // Get the user's data
      const { uid, displayName, email, photoURL } = user;
      // Save the user's data to the database
      const docRef = db.collection("users").doc(uid);
      const setDisplayName = displayName ? displayName : email;
      await docRef.set({
        setDisplayName,
        email,
        photoURL,
        createdAt: Date.now(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  