import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthContextProvider from "./Context/AuthContext.jsx";
import UserProvider from "./Context/UserContext.jsx";
import { ChatContextProvider } from "./Context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserProvider>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </UserProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
