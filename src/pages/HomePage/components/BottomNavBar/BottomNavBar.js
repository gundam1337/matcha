import React from "react";
import { FiHome, FiMessageSquare, FiSettings } from "react-icons/fi";

const BottomNavBar = () => {
  return (
    <div className="bottom-nav-bar">
      <div className="bottom-nav-bar-item">
        <FiHome />
        <span>Home</span>
      </div>
      <div className="bottom-nav-bar-item">
        <FiMessageSquare />
        <span>Messages(7)</span>
      </div>
      {/* <div className="bottom-nav-bar-item">
        <FiSettings />
        <span>Settings</span>
      </div> */}
    </div>
  );
};

export default BottomNavBar;
