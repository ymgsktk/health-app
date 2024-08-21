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
            <li><a href="/blog">Blog</a></li>
            <li><a href="/body-index">Body Index</a></li>
            <li><a href="/calorie-index">Calorie Index</a></li>
            <li><a href="/calorie-calculation">Calorie Calculation</a></li>
            <li><a href="/dashboard">Dash Board</a></li>
            <li><a href="/user">User</a></li>
          </ul>
        </nav>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;