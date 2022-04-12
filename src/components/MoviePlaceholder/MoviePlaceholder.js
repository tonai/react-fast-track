import './MoviePlaceholder.css';

function MoviePlaceholder() {
  return (
    <div className="MoviePlaceholder">
      <div className="MoviePlaceholder__poster"></div>
      <div className="MoviePlaceholder__content">
        <div className="MoviePlaceholder__title"></div>
        <div className="MoviePlaceholder__overview-1"></div>
        <div className="MoviePlaceholder__overview-2"></div>
        <div className="MoviePlaceholder__overview-3"></div>
      </div>
    </div>
  );
}

export default MoviePlaceholder;
