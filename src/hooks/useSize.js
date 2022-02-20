import { useState, useEffect } from "react";

const getSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export const useSize = () => {
  const initSize = getSize();

  const [size, setSize] = useState(initSize);

  useEffect(() => {
    const handleResize = () => {
      const newSize = getSize();
      setSize(newSize);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useSize;
