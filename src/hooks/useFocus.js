import { useEffect, useRef } from "react";

export function useFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return inputRef;
}
