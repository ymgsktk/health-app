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

  const calorieindex = ()=>{
    navigate(`/${PATH_URL.calorieindex}`)
  }
  const blog = ()=>{
    navigate(`/${PATH_URL.blog}`)
  }
  const caloriecalculation = ()=>{
    navigate(`/${PATH_URL.caloriecalculation}`)
  }
  const bodyindex = ()=>{
    navigate(`/${PATH_URL.bodyindex}`)
  }
  const dashboard = ()=>{
    navigate(`/${PATH_URL.dashboard}`)
  }
  const user = ()=>{
    navigate(`/${PATH_URL.user}`)
  }

  return (
    <div>
      <div className="header">
        <h1>Header</h1>
        <nav className="pc-nav">
          <ul>
            <li><p onClick={(blog)}>Blog</p></li>
            <li><p onClick={(bodyindex)}>Body Index</p></li>
            <li><p onClick={(calorieindex)}>Calorie Index</p></li>
            <li><p onClick={(caloriecalculation)}>Calorie Calculation</p></li>
            <li><p onClick={(dashboard)}>Dash Board</p></li>
            <li><p onClick={(user)}>User</p></li>
          </ul>
        </nav>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;