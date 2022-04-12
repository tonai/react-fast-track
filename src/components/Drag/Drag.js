import { useContext, useEffect, useRef, useState } from 'react';
import { dragAndDropContext } from '../../contexts/dragAndDrop';

function Drag(props) {
  const { children, index } = props;
  const api = useContext(dragAndDropContext);
  const {
    activeIndex,
    init,
    height,
    orders,
    positions,
    setActiveIndex,
    updatePosition
  } = api;

  const active = activeIndex === index;
  const y = positions[index];

  const ref = useRef(null);
  const startY = useRef(0);
  const [dragY, setDragY] = useState(0);
  const position = useRef(index * height.current);

  useEffect(() => {
    init(index, ref.current.offsetHeight);
  }, [init, index]);

  useEffect(() => {
    if (active) {
      position.current = orders.current.get(index) * height.current;
    }
  }, [active, index, height, orders]);

  function handleMouseDown(event) {
    event.preventDefault();
    setActiveIndex(index);
    setDragY(y);
    startY.current = event.pageY;
  }

  useEffect(() => {
    if (active) {
      function handleMouseMove(event) {
        const deltaY = event.pageY - startY.current;
        const newY = position.current + deltaY;
        setDragY(newY);
        updatePosition(index, newY);
      }
      function handleMouseUp() {
        setActiveIndex(false);
      }

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    }
  });

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        transform: `translateY(${active ? dragY : y}px)`,
        transition: active ? '' : 'transform 200ms ease-out',
        width: '100%',
        zIndex: active ? 1 : 0,
      }}
    >
      <div ref={ref} style={{ transform: `scale(${active ? 1.1 : 1})`, transition: 'transform 200ms ease-out' }}>
        {children}
      </div>
    </div>
  );
}

export default Drag;
