import { useState, useRef, useEffect } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";
import axiosInstance from "../../../../API/axiosConfig";
// import { useSelector, useDispatch } from "react-redux";
// import fetchUserSearch from "../../../../Rudex/SearchResultSlice/fetchingUserSearch";

const SuggestionsItem = ({ suggestion, onClick }) => {
  return (
    <div className="suggestion_item" onClick={() => onClick(suggestion)}>
      <span className="suggestions_info">{suggestion}</span>
    </div>
  );
};

const DropdownSuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="dropdownSuggestions">
      {Object.values(suggestions)
        .flat()
        .map((suggestion, index) => (
          <SuggestionsItem
            key={index}
            suggestion={suggestion}
            onClick={onSuggestionClick}
          />
        ))}
    </div>
  );
};

const Search = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [suggestions, setSuggestions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const wrapperRef = useRef(null); // Ref for the wrapper element
  //const dispatch = useDispatch();

  // Selecting user data from Redux store
  //const userData = useSelector((state) => state.user.userData);
  // const status = useSelector((state) => state.user.status);
  // const error = useSelector((state) => state.user.error);

  const [username, setUsername] = useState();
  
  // useEffect(() => {
  //   if (username) {
  //     dispatch(fetchUserSearch(username)); // Fetch user data when component mounts
  //   }
  //   console.log("the searched username ", userData.name);
  //   return () => {
  //     dispatch(fetchUserSearch()); // Clean up when component unmounts
  //   };
  // }, [dispatch, username]);

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
          const response = await axiosInstance.get(
            `/search?searchTerm=${searchQuery}`
          );
          console.log(response.data);
          setSuggestions(response.data);
        } catch (error) {
          console.log("there is an error ");
          console.error("Error:", error);
        }
      }
    };
    fetchSuggestions();
  }, [searchQuery]);

  //this function for fetching more data about the searched user
  //TODO push the user selected user to redux
  const handleSuggestionClick = (suggestion) => {
    console.log("Selected suggestion:", suggestion);

    // You can add additional logic here if needed
  };

  //fix the UI for the focus on the entire saerch bar not just the input
  return (
    <div className="search-bar" ref={wrapperRef} onClick={toggleDropdown}>
      <i className="uil uil-search"></i>
      <input
        type="search"
        placeholder="Search ..."
        onChange={handleInputChange}
      ></input>
      {isDropdownVisible && (
        <DropdownSuggestions
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default Search;
