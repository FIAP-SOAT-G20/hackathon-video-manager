'use client';

import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../contexts/DarkModeContext';

const DarkModeToggle = ({ className = '', size = 'sm', testId = 'dark-mode-toggle' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      color="link"
      onClick={toggleDarkMode}
      className={`dark-mode-toggle ${className}`}
      size={size}
      data-testid={testId}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <FontAwesomeIcon 
        icon={isDarkMode ? faSun : faMoon} 
        className={isDarkMode ? 'text-warning' : 'text-dark'}
      />
    </Button>
  );
};

export default DarkModeToggle;
