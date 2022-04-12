import { useCallback, useRef, useState } from 'react';

import { dragAndDropContext } from '../../contexts/dragAndDrop';

function Drop(props) {
  const { children } = props;

  const height = useRef(0);
  const orders = useRef(new Map());
  const [activeIndex, setActiveIndex] = useState(false);
  const [positions, setPositions] = useState([]);

  const init = useCallback((index, blockHeight) => {
    height.current = blockHeight;
    orders.current.set(index, index);
    setPositions(prevState => prevState.concat(index * height.current));
  }, []);

  const updatePosition = useCallback((index, y) => {
    const nextPosition = Math.floor((y + height.current / 2) / height.current);
    const prevPosition = orders.current.get(index);
    if (prevPosition !== nextPosition) {
      const otherIndex = Array.from(orders.current.values()).findIndex(value => value === nextPosition);
      orders.current.set(index, nextPosition);
      orders.current.set(otherIndex, prevPosition);
      setPositions(prevState => {
        return prevState.map((position, i) => {
          if (i === index) {
            return nextPosition * height.current;
          } else if (i === otherIndex) {
            return prevPosition * height.current;
          }
          return position;
        });
      });
    }
  }, []);

  const api = {
    activeIndex,
    init,
    height,
    orders,
    positions,
    setActiveIndex,
    updatePosition
  };

  return (
    <div style={{ height: positions.length * height.current, position: 'relative' }}>
      <dragAndDropContext.Provider value={api}>
        {children}
      </dragAndDropContext.Provider>
    </div>
  );
}

export default Drop;
