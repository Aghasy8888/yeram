import { useEffect, useState } from "react";

export function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window === "undefined" ? 0 : window.outerWidth,
  );
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.outerWidth);
    };

    updateWindowWidth();

    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  return windowWidth;
}
