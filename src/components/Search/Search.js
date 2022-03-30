import "./Search.css";

function Search(props) {
  const { search, setSearch, onSearch } = props;

  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <form className="Search" onSubmit={handleSubmit}>
      <input className="Search__input" value={search} onChange={handleChange}/>
      <input className="Search__submit" type="submit"/>
    </form>
  );
}

export default Search;
