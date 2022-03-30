import classnames from "classnames";

import "./Pager.css";

function Pager(props) {
  const { page, onPageChange, total_pages } = props;

  return (
    <ul className="Pager">
      {Array.from({ length: total_pages }).map((_, i) => (
        <button
          className={classnames('Pager__page', { 'Pager__page--active': i + 1 === page })}
          key={i}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </ul>
  );
}

export default Pager;
