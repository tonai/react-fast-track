import { useFocus } from '../../hooks/useFocus';

import "./Search.css";

function Search(props) {
  const { search, onChange } = props;
  const inputRef = useFocus();

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    onChange(event.target.value);
  }
  
  return (
    <form className="Search" onSubmit={handleSubmit}>
      <input className="Search__input" value={search} onChange={handleChange} ref={inputRef}/>
    </form>
  );
}

export default Search;
