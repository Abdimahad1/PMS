import React, { createContext, useState } from 'react';

// Create the ThemeContext using React's createContext function
export const ThemeContext = createContext();

// Define the different themes and their corresponding styles
const themes = {
  light: {
    sidebar: 'bg-gray-100 text-black',
    borderColor: 'border-gray-300',
    hoverBgColor: 'bg-gray-200',
    background: 'bg-gray-100',
    text: 'text-black'
  },
  dark: {
    background: 'bg-gray-800',
    text: 'text-white',
    sidebar: 'bg-gray-900 text-white',
    borderColor: 'border-gray-700',
    hoverBgColor: 'bg-gray-700'
  },
  green: {
    background: 'bg-green-200',
    text: 'text-black',
    sidebar: 'bg-green-300 text-black',
    borderColor: 'border-green-400',
    hoverBgColor: 'bg-green-400'
  },
  blue: {
    background: 'bg-blue-200',
    text: 'text-black',
    sidebar: 'bg-blue-300 text-black',
    borderColor: 'border-blue-400',
    hoverBgColor: 'bg-blue-400'
  },
  red: {
    background: 'bg-red-200',
    text: 'text-black',
    sidebar: 'bg-red-300 text-black',
    borderColor: 'border-red-400',
    hoverBgColor: 'bg-red-400'
  },
};

// Define the ThemeProvider component
export const ThemeProvider = ({ children }) => {
  // Use useState to manage the current theme, defaulting to the 'red' theme
  const [theme, setTheme] = useState(themes.red);

  // Define a function to change the theme
  const changeTheme = (newTheme) => {
    setTheme(themes[newTheme]); // Update the theme state to the selected new theme
  };

  return (
    // Provide the theme and changeTheme function to the rest of the application
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children} {/* Render any child components */}
    </ThemeContext.Provider>
  );
};
