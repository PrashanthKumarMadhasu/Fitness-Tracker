import React, { createContext, useState, useMemo } from 'react';

// Create the ThemeContext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Define the themeColor state and toggle function
    const [themeColor, setThemeColor] = useState(false); // false for light, true for dark
//true for dark, false for light

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
                {children}
        </ThemeContext.Provider>
    );
};
