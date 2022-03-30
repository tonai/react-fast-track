import { useEffect, useState } from 'react';

export function useInfiniteScroll() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState({
    results: [],
    total_pages: 1,
  });

  useEffect(() => {
    if (search.length > 2) {
      setLoading(true);
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&query=${search}&page=${page}`)
        .then(response => response.json())
        .then(json => {
          setMovies(prevState => ({
            ...json,
            results: prevState.results.concat(json.results)
          }));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setMovies({
        results: [],
        total_pages: 1,
      });
    }
  }, [page, search]);

  useEffect(() => {
    const scroll = () => {
      const html = document.querySelector('html');
      if (!loading && html.scrollTop + window.innerHeight > html.offsetHeight - 20 && page < movies.total_pages) {
        setPage(page + 1);
      }
    }
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  });

  return { loading, search, movies, setPage, setSearch, setMovies };
}