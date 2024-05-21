import { useState } from "react";

import Likes from "./Likes";
import Matches from "./Matches";
import Primary from "./Primary/Primary";
import SearchBar from "./SearchBar";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [matchesCount, setMatchesCount] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Handler to toggle category details
  const handleCategoryClick = (category) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
    setMatchesCount(0);
  };

  const handleMatchClick = (match) => {
    console.log(match);
    setSelectedMatch(match);
    setActiveCategory('primary'); // Switch to the Primary component to show the clicked match
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
          // requests is a class name for highlitiing the text
          className={activeCategory === "likes" ? "active" : ""}
        >
          Likes (7)
        </h6>
      </div>
      {activeCategory === "primary" && <Primary selectedMatch = {selectedMatch} />}
      {activeCategory === "matches" && (
        <Matches setMatchesCount={setMatchesCount} onMatchClick={handleMatchClick} />
      )}
      {activeCategory === "likes" && <Likes />}
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
        <SearchBar></SearchBar>

        {/*  CATEGORY */}
        <Category></Category>
      </div>
    </div>
  );
};

export default Connect;
