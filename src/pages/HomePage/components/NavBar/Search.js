import { useState, useRef } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

const SuggestionsItem = (suggestion) => {
  return <span className="notify_time">{suggestion}</span>;
};

const DropdownSuggestions = () => (
  <div className="dropdown">
    <SuggestionsItem suggestion="Alex commented on" />
    <SuggestionsItem suggestion="Ben hur" />
  </div>
);

const Search = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null); // Ref for the wrapper element

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleClose = () => setDropdownVisible(false);

  useOutsideAlerter(wrapperRef, handleClose);

  return (
    <div className="search-bar">
      <i className="uil uil-search"></i>
      <input type="search" placeholder="Search for a Matcha" />
      {isDropdownVisible && <DropdownSuggestions></DropdownSuggestions>}
    </div>
  );
};

export default Search;
