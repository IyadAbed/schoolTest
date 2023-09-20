import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Regestration from "./Pages/Regestration";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import { UserContext } from "./Context/UserContext";
import Page404 from "./Pages/Page404";
import StudentPage from "./Pages/StudentPage";
import NavBar from "./Component/Navbar";
// import ChatPage from "./Pages/ChatPage";
import "./style.scss";
import { Chatt } from "./Pages/Chatt";

export const RefreshContext = createContext();
function App() {
  const [refresh, setRefresh] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <>
      <RefreshContext.Provider value={{ refresh, setRefresh }}>
        <BrowserRouter>
          <ScrollToTop />
          <NavBar auth={auth} setAuth={setAuth} />
          {auth && user.role === "Admin" ? (
            <Routes>
              <Route index path="/" element={<Admin />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          ) : auth && user.role === "User" ? (
            <>
              <Routes>
                <Route path="/" element={<StudentPage />} />
                <Route path="Chat" element={<Chatt />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route index path="/registration" element={<Regestration />} />
              <Route path="login" element={<Login />} />
            </Routes>
          )}
        </BrowserRouter>
      </RefreshContext.Provider>
    </>
  );
}

export default App;
