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
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");

  const renderContent = () => {
    if (activeLink === "home") {
      return <TableOfSubject />;
    }
    // else if (activeLink === "profile")
    // {
    //   return <ProfileSettings goBack={() => handleLinkClick("home")} />;
    // } else if (activeLink === "add") {
    //   return <Profileadd />;
    // }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const { refresh } = useContext(AuthContext);

  function handleLogout() {
    localStorage.clear();
    refresh();
    navigate("/login");
  }

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        style={{ backgroundColor: "#70ACC7", color: "white" }}
        aria-label="logo-sidebar"
      >
        <div className="h-full px-2 py-2 overflow-y-auto">
          <Link
            to="/"
            className="self-center text-2xl font-semibold whitespace-nowrap"
          >
            PLU
          </Link>
          <br />
          <br />
          <ul className="space-y-2 font-medium">
            <Link
              to="/"
              className="flex items-center p-2 rounded-lg hover:bg-[#cbefff] -100 hover:text-black dark:hover:bg-black-700"
              onClick={() => handleLinkClick("home")}
            >
              <AiFillHome className="w-5 h-5" style={{ color: "black" }} />
              <span className="ml-3">Home</span>
            </Link>
            <li>
              <a
                onClick={handleLogout}
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-[#cbefff] -100 hover:text-black dark:hover:bg-black-700"
              >
                <FiLogOut className="w-7 h-7" style={{ color: "black" }} />
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{renderContent()}</div>
    </>
  );
}

// export function UserProfile() {

// }

export default StudentPage;
