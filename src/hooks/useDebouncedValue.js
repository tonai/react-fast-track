import { useEffect, useMemo, useState } from 'react';
import debounce from "lodash.debounce";

export function useDebouncedValue(value) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debounced = useMemo(
    () => debounce((value) => setDebouncedValue(value), 400),
    []
  );

  useEffect(() => debounced(value), [value, debounced])
  // debounced(value);

  return debouncedValue;
}