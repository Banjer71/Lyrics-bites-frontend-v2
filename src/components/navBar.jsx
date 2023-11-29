import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const { authState } = auth;

  let navigate = useNavigate()

  const handleLogout = () => {
    if (auth.isAuthenticated()) {
      auth.logout();
    } else {
      navigate('/login')
    }
  };
  return (
    <div>
      <ul className="navbar">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to={auth.isAuthenticated() ? "/displayAllSongs" : "/login"}>
          <li>My List</li>
        </Link>
        <Link to={auth.isAuthenticated() ? "/profile" : "/signup"}>
          <li>
            {authState.userInfo.firstName
              ? authState.userInfo.firstName
              : "Signup"}
          </li>
        </Link>
        <li onClick={handleLogout} style={{cursor: 'pointer'}}>
          {auth.isAuthenticated() ? "Logout" : "Login"}
        </li>

      </ul>
    </div>
  );
};

export default Navbar;
