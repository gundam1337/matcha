import { useState, useRef,useEffect } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";
import axios from "axios";

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
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef(null); // Ref for the wrapper element

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleClose = () => setDropdownVisible(false);

  useOutsideAlerter(wrapperRef, handleClose);

  // Function to handle input change and update search query
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // useEffect to make a request when the search query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 0) {
        try {
          const response = await axios.get(`/search?query=${searchQuery}`);
          console.log("data response ",response)
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  return (
    <div className="search-bar" ref={wrapperRef} onClick={toggleDropdown}>
      <i className="uil uil-search"></i>
      <input
        type="search"
        placeholder="Search ..."
        onChange={handleInputChange}
      ></input>
      {isDropdownVisible && <DropdownSuggestions suggestions={suggestions} />}
    </div>
  );
};

export default Search;
