/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useLayoutEffect, useEffect } from "react";

export const useSize = (targetRef) => {
  const getDimensions = () => {
    return targetRef.current ? targetRef.current.offsetWidth : 0;
  };

  const [dimensions, setDimensions] = useState(getDimensions);
  const handleResize = () => {
    setDimensions(getDimensions());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[]);

  useLayoutEffect(() => {
    handleResize();
  },[]);
  return dimensions;
};
