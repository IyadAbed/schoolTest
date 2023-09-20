import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  let isLoggedIn = false;
  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const refresh = () => {
    if (localStorage.getItem("token"))
      isLoggedIn = localStorage.getItem("token") ? true : false;
    setAuth(isLoggedIn);
  };
  useEffect(() => {
    refresh();
  }, []);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     console.log(user);
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, []);
  return (
    <>
      {" "}
      <AuthContext.Provider value={{ auth, setAuth, refresh }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
