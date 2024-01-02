import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../css/navbar.css";

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
        <Link to="/" onClick={() => localStorage.removeItem('state')}>
          <li>Home</li>
        </Link>
        <Link to={auth.isAuthenticated() ? "/displayAllSongs" : "/login"}>
          <li>My List</li>
        </Link>
        <Link to={auth.isAuthenticated() ? "/profile" : "/signup"}>
          <li>
            {authState.userInfo.nickName
              ? authState.userInfo.nickName
              : "Signup"}
          </li>
        </Link>
        {auth.isAuthenticated() ? (
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </li>
        ) : (
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Login
          </li>
        )}


      </ul>
    </div>
  );
};

export default Navbar;
