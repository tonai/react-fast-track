import { useState } from 'react';

import Movie from '../Movie/Movie';
import Search from '../Search/Search';
import Pager from '../Pager/Pager';

import "./Movies.css";

function Movies() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState({
    results: [],
    total_pages: 1,
  });

  function handleSearch() {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&query=${search}`)
      .then(response => response.json())
      .then(json => setMovies(json));
  }

  function handlePageChange(page) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&query=${search}&page=${page}`)
      .then(response => response.json())
      .then(json => setMovies(json));
  }

  return (
    <div className="Movies">
      <Search search={search} setSearch={setSearch} onSearch={handleSearch}/>
      {movies.results.map(movie => <Movie key={movie.id} movie={movie}/>)}
      {movies.total_pages > 1 && (<Pager total_pages={movies.total_pages} page={movies.page} onPageChange={handlePageChange} />)}
    </div>
  );
}

export default Movies;
