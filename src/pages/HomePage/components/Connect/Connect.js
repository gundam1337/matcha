import React, { useState, useMemo } from "react";

import Likes from "./Likes";
import Matches from "./Matches";
import Primary from "./Primary/Primary";
import SearchBar from "./SearchBar";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState("primary");
  const [matchesCount, setMatchesCount] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    setActiveCategory("primary"); // Switch to the Primary component to show the clicked match
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
          className={`${matchesCount !== 0 ? "requests" : ""}${
            matchesCount !== 0 && activeCategory === "matches" ? " " : ""
          }${activeCategory === "matches" ? "active" : ""}`}
        >
          Matches({matchesCount})
        </h6>
        <h6
          onClick={() => handleCategoryClick("likes")}
          className={activeCategory === "likes" ? "active" : ""}
        >
          Likes (7)
        </h6>
      </div>
      <div>
        <div
          style={{ display: activeCategory === "primary" ? "block" : "none" }}
        >
          <Primary selectedMatch={selectedMatch} />
        </div>
        <div
          style={{ display: activeCategory === "matches" ? "block" : "none" }}
        >
          <Matches
            setMatchesCount={setMatchesCount}
            onMatchClick={handleMatchClick}
          />
        </div>
        <div style={{ display: activeCategory === "likes" ? "block" : "none" }}>
          <Likes />
        </div>
      </div>
    </div>
  );
};

const Connect = () => {
  return (
    <div className="connect">
      <div className="messages">
        <div className="heading">
          <h4>Messages</h4>
          {/* change this to a log with a connection meaning  */}
          {/* <i className="uil uil-edit"></i> */}
        </div>

        {/* SEARCH BAR */}
        {/* <SearchBar></SearchBar> */}

        {/*  CATEGORY */}
        {/* TODO  use the context API to  */}
        <Category></Category>
      </div>
    </div>
  );
};

export default Connect;
