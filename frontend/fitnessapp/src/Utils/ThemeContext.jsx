import React, { createContext, useState } from 'react';

// Create the ThemeContext with default values
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Define the themeColor state and toggle function
    const [themeColor, setThemeColor] = useState(false); // false for light, true for dark


    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeContext.Provider>
    );
};
