import React from 'react';
import styled from 'styled-components';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: ${({ theme }) => theme.text_primary};

  &:hover {
    background: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 20px;
    transition: transform 0.3s ease-in-out;
  }

  @media screen and (max-width: 768px) {
    width: 36px;
    height: 36px;

    svg {
      font-size: 18px;
    }
  }
`;

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <LightMode /> : <DarkMode />}
    </ToggleButton>
  );
};

export default ThemeToggle;
