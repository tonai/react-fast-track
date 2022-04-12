import { lazy, Suspense, useCallback } from 'react';
import Loader from '../Loader/Loader';
import Search from '../Search/Search';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

import "./Movies.css";
import MoviePlaceholder from '../MoviePlaceholder/MoviePlaceholder';
import ViewportLoader from '../ViewportLoader/ViewportLoader';
import Drop from '../Drop/Drop';
import Drag from '../Drag/Drag';

const Movie = lazy(() => import('../Movie/Movie'));

function Movies() {
  const { loading, search, movies, setPage, setSearch, setMovies } = useInfiniteScroll();

  const handleChange = useCallback((search) => {
    setMovies({
      results: [],
      total_pages: 1,
    });
    setSearch(search);
    setPage(1);
  }, [setMovies, setSearch, setPage]);

  return (
    <div className="Movies">
      <Search search={search} onChange={handleChange}/>
      <ViewportLoader height="3160px">
        <Drop key={search}>
          {movies.results.map((movie, index) => (
            <Drag key={movie.id} index={index}>
              <Suspense fallback={<MoviePlaceholder/>}>
                <Movie movie={movie}/>
              </Suspense>
            </Drag>
          ))}
        </Drop>
      </ViewportLoader>
      {loading && <Loader/>}
    </div>
  );
}

export default Movies;
