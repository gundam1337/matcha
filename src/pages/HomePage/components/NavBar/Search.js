const Search = () => {
  const handleFocus = () => {
    document.querySelector("nav").classList.add("full-width-search");
  };

  const handleBlur = () => {
    document.querySelector("nav").classList.remove("full-width-search");
  };
  return (
    <div className="search-bar">
      <i className="uil uil-search"></i>
      <input
        type="search"
        placeholder="Search for a Matcha"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Search;
