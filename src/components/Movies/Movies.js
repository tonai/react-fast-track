import Loader from '../Loader/Loader';
import Movie from '../Movie/Movie';
import Search from '../Search/Search';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

import "./Movies.css";

function Movies() {
  const { loading, search, movies, setPage, setSearch, setMovies } = useInfiniteScroll();

  function handleChange(search) {
    setMovies({
      results: [],
      total_pages: 1,
    });
    setSearch(search);
    setPage(1);
  }

  return (
    <div className="Movies">
      <Search search={search} onChange={handleChange}/>
      {movies.results.map(movie => <Movie key={movie.id} movie={movie}/>)}
      {loading && <Loader/>}
    </div>
  );
}

export default Movies;
