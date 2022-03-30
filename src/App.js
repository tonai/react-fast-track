import { useEffect, useState } from 'react';

import Movies from './components/Movies/Movies';

import { configurationContext } from './contexts/configuration'

function App() {
  const [configuration, setConfiguration] = useState();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_TMDB_API}`)
      .then(response => response.json())
      .then(json => setConfiguration(json))
  }, []);

  return (
    <configurationContext.Provider value={configuration}>
      <Movies/>
    </configurationContext.Provider>
  );
}

export default App;
