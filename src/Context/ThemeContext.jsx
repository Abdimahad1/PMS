import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const themes = {
  
  dark: {
    background: 'bg-gray-800',
    text: 'text-black',
    sidebar: 'bg-gray-900 text-white',
  },
  green: {
    background: 'bg-green-200',
    text: 'text-black',
    sidebar: 'bg-green-300 text-white',
  },
  blue: {
    background: 'bg-blue-200',
    text: 'text-black',
    sidebar: 'bg-blue-300 text-white',
  },
 
  red: {
    background: 'bg-red-200',
    text: 'text-black',
    sidebar: 'bg-red-300 text-white',
  },
};


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);

  const changeTheme = (newTheme) => {
    setTheme(themes[newTheme]);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
