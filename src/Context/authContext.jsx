import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Config/firestore";
import { onAuthStateChanged } from "firebase/auth";

//Custom Hook to get the AuthContext Values
export function useAuthValues() {
  return useContext(authContext);
}

const authContext = createContext();
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //When user enters website for the first time we start listening to the Firebase auth instance for any changes in the auth, if so then we want to subscribe to the auth. And when the use is about to leave the website we want to unsubscribe the auth.
  useEffect(() => {
    // Firebase auth instance
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setIsLoggedIn(true);
    } else {
      setCurrentUser(null);
      setIsLoggedIn(false);
    }

    setIsLoading(false);
  }

  return (
    <authContext.Provider value={ {currentUser, isLoggedIn, isLoading} }>
      {!isLoading && children}
    </authContext.Provider>
  );
}

export default AuthProvider;
