import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const themes = {
  light: {
    background: 'bg-white',
    text: 'text-black',
    sidebar: 'bg-gray-200',
  },
  dark: {
    background: 'bg-gray-800',
    text: 'text-white',
    sidebar: 'bg-gray-900',
  },
  green: {
    background: 'bg-green-200',
    text: 'text-black',
    sidebar: 'bg-green-300',
  },
  blue: {
    background: 'bg-blue-200',
    text: 'text-black',
    sidebar: 'bg-blue-300',
  },
  gray: {
    background: 'bg-gray-200',
    text: 'text-black',
    sidebar: 'bg-gray-300',
  },
  red: {
    background: 'bg-red-200',
    text: 'text-black',
    sidebar: 'bg-red-300',
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
