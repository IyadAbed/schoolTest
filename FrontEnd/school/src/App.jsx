import { BrowserRouter, Route, Routes } from "react-router-dom";
import Regestration from "./Pages/Regestration";
import SignUp from "./Pages/SignUp";
import Admin from "./Component/Admin";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Regestration />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Dashboard" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
