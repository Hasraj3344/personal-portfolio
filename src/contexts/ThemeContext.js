import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from '../utils/Themes';
import { createPortfolioTheme } from '../theme/muiTheme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;
  const muiTheme = createPortfolioTheme(darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <StyledThemeProvider theme={theme}>
          {children}
        </StyledThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
