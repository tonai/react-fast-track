import { useEffect, useMemo, useRef, useState } from "react";

function ViewportLoader(props) {
  const { children, height } = props;
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting === true) {
          observer.unobserve(ref.current);
          setVisible(true);
        }
      }),
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [observer]);

  if (visible) {
    return children;
  }

  return <div ref={ref} style={{ height }}></div>;
}

export default ViewportLoader;
