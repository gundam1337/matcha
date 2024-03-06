import { useState, useRef } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

const SuggestionsItem = ({ suggestion }) => {
  return (
    <div className="suggestion_item">
      <span className="suggestions_info">{suggestion}</span>
    </div>
  );
};


const DropdownSuggestions = () => (
  <div className="dropdownSuggestions">
    <SuggestionsItem suggestion="Omar" />
    <SuggestionsItem suggestion="Omari" />
    <SuggestionsItem suggestion="Omaroui" />
    <SuggestionsItem suggestion="Omarali" />
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
    <div className="search-bar" ref={wrapperRef} onClick={toggleDropdown}>
      <i className="uil uil-search"></i>
      <input type="search" placeholder="Search for a Matcha" ></input>
      {isDropdownVisible && <DropdownSuggestions></DropdownSuggestions>}
    </div>
  );
};

export default Search;
