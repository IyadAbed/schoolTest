import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ auth, setAuth }) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    setAuth(false);
    navigate("/login");
  };
  return (
    <>
      <div className="navbar justify-between w-full bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        {auth ? (
          <>
            <div role="button" onClick={handleLogOut} className="navbar-end">
              <Link className="btn">LogOut</Link>
            </div>
          </>
        ) : (
          <>
            <div role="button" className="navbar-end">
              <Link to={"/login"} className="btn">
                LogIn
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default NavBar;
