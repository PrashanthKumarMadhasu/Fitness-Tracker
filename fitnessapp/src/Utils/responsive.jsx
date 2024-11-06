import React, { useState, useEffect } from "react"; 

// Utils/responsive.js

// Function to detect mobile screen size based on a width threshold
export const isMobile = () => window.innerWidth <= 768; 
export const isTab = () => window.innerWidth >= 768 && window.innerWidth <= 991;
export const isDesktop = () => window.innerWidth >=992 && window.innerWidth <=1199;
export const isLargeDesktop = () => window.innerWidth >=1200;
// Function to add event listener for viewport changes and return the current state
export const screenSize = () => {

  const [isMobileView, setIsMobileView] = React.useState(isMobile());
  const [isTabView, setIsTabView] = React.useState(isTab());
  const [isDesktopView, setIsDesktopView] = React.useState(isDesktop());
  const [isLargeDesktopView, setIsLargeDesktopView] = React.useState(isLargeDesktop());

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(isMobile());
      setIsTabView(isTab());
      setIsDesktopView(isDesktop());
      setIsLargeDesktopView(isLargeDesktop());
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [isMobileView, isTabView, isDesktopView, isLargeDesktopView];
};
