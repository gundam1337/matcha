

const Search = () => {
  return (
    <>
      <input
        id="search"
        //className={styles.input}
        type="search"
        placeholder="Search..."
        autofocus
        required
      />
      <button type="submit" >
        Go
      </button>
    </>
  );
};


export default Search