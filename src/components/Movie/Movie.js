import { useState } from "react";
import classnames from "classnames";

import { withConfiguration } from '../../hoc/withConfiguration';

import "./Movie.css";

function Movie(props) {
  const { configuration, movie } = props;
  const [selected, setSelected] = useState(false);
  const rootClassNames = classnames('Movie', { Movie__selected: selected });

  function handleClick() {
    setSelected(prev => !prev);
  }

  return (
    <div className={rootClassNames} onClick={handleClick}>
      <img
        className="Movie__poster"
        src={`https://image.tmdb.org/t/p/${configuration.images.poster_sizes[0]}${movie.poster_path}`}
        alt="Movie poster"
        width="92"
        height="138"
      />
      <div>
        <h2>{movie.title}</h2>
        <div>{movie.overview.length > 250 ? movie.overview.substr(0, 250) + '...' : movie.overview}</div>
      </div>
    </div>
  );
}

export default withConfiguration(Movie);
