import React, { useContext } from "react";
import TableOfSubject from "../Component/TableOfSubject";
// import { UserContext } from "../Context/UserContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaFutbol } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { BiChip, BiGitMerge, BiMessageRounded } from "react-icons/bi";
import { AuthContext } from "../Context/AuthContext";

function StudentPage() {
  return (
    <>
      <TableOfSubject />
    </>
  );
}

// export function UserProfile() {

// }

export default StudentPage;
