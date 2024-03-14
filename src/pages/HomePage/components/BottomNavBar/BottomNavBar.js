import React from "react";
import { FiHome, FiMessageSquare, FiSettings } from "react-icons/fi";

const BottomNavBar = ({ onNavItemClicked }) => {
    return (
      <div className="bottom-nav-bar">
        <div className="bottom-nav-bar-item" onClick={() => onNavItemClicked('Home')}>
          <FiHome />
          <span>Home</span>
        </div>
        <div className="bottom-nav-bar-item" onClick={() => onNavItemClicked('Messages')}>
          <FiMessageSquare />
          <span>Messages(7)</span>
        </div>
      </div>
    );
  };
  

export default BottomNavBar;
