import React from "react";
import { Aside } from "../Component/Aside";
import { Nav } from "../Component/Nav";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Nav />
      <Aside />
    </>
  );
}

export default Dashboard;
