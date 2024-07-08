import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const themes = {
  light: {
    sidebar: 'bg-gray-100 text-black',
    borderColor: 'border-gray-300',
    hoverBgColor: 'bg-gray-200'
},
  
  dark: {
    background: 'bg-gray-800',
    text: 'text-black',
    sidebar: 'bg-gray-900 text-white',
  },
  green: {
    background: 'bg-green-200',
    text: 'text-black',
    sidebar: 'bg-green-300 text-black',
  },
  blue: {
    background: 'bg-blue-200',
    text: 'text-black',
    sidebar: 'bg-blue-300 text-black',
  },
 
  red: {
    background: 'bg-red-200',
    text: 'text-black',
    sidebar: 'bg-red-300 text-black',
  },
};


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.red);

  const changeTheme = (newTheme) => {
    setTheme(themes[newTheme]);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
