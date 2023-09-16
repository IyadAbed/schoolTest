import React from "react";
import { Aside } from "../Component/Aside";
import { Nav } from "../Component/Nav";
import { Outlet } from "react-router-dom";
import Admin from "./Admin";

function Dashboard() {
  return (
    <>
      <Nav />
      <Aside />
      <Admin />
    </>
  );
}

export default Dashboard;
