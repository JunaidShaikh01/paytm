import React, { useEffect, useState } from "react";

export default function useDebounce(inputVal, delay) {
  const [debounceVal, setDebouncedVal] = useState(inputVal);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedVal(inputVal);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay, inputVal]);

  return debounceVal;
}
