import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const userRefresh = () => {
    if (localStorage.getItem("token")) {
      axios
        .get(`http://localhost:5000/getUser`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data) {
            console.log("user", response.data);
            setUser(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  localStorage.setItem("userId", user._id);
  useEffect(() => {
    userRefresh();
  }, []);

  return (
    <>
      {" "}
      <UserContext.Provider value={{ user, setUser, userRefresh }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
