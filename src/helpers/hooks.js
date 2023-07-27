import { useState, useLayoutEffect } from "react";

export const useSize = () => {
  const [size, setSize] = useState();

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };

    handleResize(); // Set the initial size

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup 
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};
