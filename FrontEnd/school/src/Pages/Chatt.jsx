import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { FaUser, FaCog, FaFutbol } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
// import { BiChip, BiGitMerge, BiMessageRounded } from "react-icons/bi";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import ChatWidget from "../Component/ChatWidget";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const Chatt = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");
  const [subjects, setSubject] = useState();
  const [users, setUsers] = useState();
  const { refresh } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUserSubjects/${user._id}`)
      .then((response) => {
        setSubject(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/commonUsers/${user._id}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [userSellected, setUserSellected] = useState({
    id: "",
    name: "",
  });

  const [combineId, setCombineId] = useState();

  const renderContent = () => {
    if (userSellected) {
      return (
        <ChatWidget
          userSellected={userSellected}
          user={user}
          combinedId={combineId}
        />
      );
    }
    // else if (activeLink === "profile")
    // {
    //   return <ProfileSettings goBack={() => handleLinkClick("home")} />;
    // } else if (activeLink === "add") {
    //   return <Profileadd />;
    // }
  };

  const handleLinkClick = async (a, b) => {
    setUserSellected({
      id: a,
      name: b,
    });
    const combinedId = user._id > a ? user._id + a : a + user._id;
    setCombineId(combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res);
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user._id + user._id), {
          [combinedId + ".userInfo"]: {
            uid: a,
            Name: b,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", a + a), {
          [combinedId + ".userInfo"]: {
            uid: user._id,
            Name: user.name,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    // setActiveLink(link);
  };

  // function handleLogout() {
  //   localStorage.clear();
  //   refresh();
  //   navigate("/login");
  // }

  // const std = subjects?.map(({ students }) => {
  //   return students;
  // });
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
            {user.name}
            <br />
            {subjects?.map((subjects) => {
              return subjects.name + "/";
            })}
          </Link>
          <br />
          <br />
          <ul className="space-y-2 font-medium">
            {users?.map(({ _id, name, Subjects }) => {
              return (
                <>
                  <button
                    key={_id}
                    className="flex w-full items-center p-2 rounded-lg hover:bg-[#cbefff] -100 hover:text-black dark:hover:bg-black-700"
                    onClick={() => handleLinkClick(_id, name)}
                  >
                    <AiFillHome
                      className="w-5 h-5"
                      style={{ color: "black" }}
                    />
                    <span className="ml-3">{name + `-`}</span> <br />
                    {Subjects?.map(({ name, _id }) => {
                      return (
                        <>
                          <p key={_id}>{name + `/ `}</p>
                        </>
                      );
                    })}
                  </button>
                </>
              );
            })}

            {/* <li>
              <a
                onClick={handleLogout}
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-[#cbefff] -100 hover:text-black dark:hover:bg-black-700"
              >
                <FiLogOut className="w-7 h-7" style={{ color: "black" }} />
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
              </a>
            </li> */}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{renderContent()}</div>
    </>
  );
};
