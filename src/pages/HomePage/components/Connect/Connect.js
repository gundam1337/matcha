import { useState } from "react";

import Likes from "./Likes";
import Matches from "./Matches";
import Primary from "./Primary";
import SearchBar from "./SearchBar";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  // Handler to toggle category details
  const handleCategoryClick = (category) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  return (
    <div>
    <div className="category">
      <h6
        onClick={() => handleCategoryClick("primary")}
        className={activeCategory === "primary" ? "active" : ""}
      >
        Primary
      </h6>
      <h6
        onClick={() => handleCategoryClick("matches")}
        className={activeCategory === "matches" ? "active" : ""}
      >
        Matches(1)
      </h6>
      <h6
        onClick={() => handleCategoryClick("likes")}
        className={`message-requests ${
          activeCategory === "likes" ? "active" : ""
        }`}
      >
        Likes (7)
      </h6>
      
      </div>
      {activeCategory === 'primary' && <Primary />}
      {activeCategory === 'matches' && <Matches />}
      {activeCategory === 'likes' && <Likes />}
    </div>
  );
};

const Connect = () => {
  return (
    <div className="connect">
      <div className="messages">
        <div className="heading">
          <h4>Messages</h4>
          <i className="uil uil-edit"></i>
        </div>

        {/* SEARCH BAR */}
        <SearchBar></SearchBar>

        {/*  CATEGORY */}
        {/* <div className="category">
          <h6>Primary</h6>
          <h6 className="active">Matches </h6>
          <h6 className="message-requests">Likes (7)</h6>
        </div> */}
        <Category></Category>

        {/* MESSAGES */}

      
      </div>
    </div>
  );
};

export default Connect;
