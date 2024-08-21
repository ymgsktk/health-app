import React from "react";
import { PATH_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import './index.css';

const Header = () => {

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate(`/${PATH_URL.signIn}`);
  }

  return (
    <div>
      <div className="header">
        <h1>Header</h1>
        <nav className="pc-nav">
          <ul>
            <li><a href="#">ABOUT</a></li>
            <li><a href="#">SERVICE</a></li>
            <li><a href="#">COMPANY</a></li>
            <li><a href="#">CONTACT</a></li>
          </ul>
        </nav>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;