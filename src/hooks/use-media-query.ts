import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    
    const timer = setTimeout(() => setValue(result.matches), 0);

    return () => {
      result.removeEventListener("change", onChange);
      clearTimeout(timer);
    };
  }, [query]);

  return value;
}
