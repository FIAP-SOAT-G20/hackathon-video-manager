import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DarkModeProvider, useDarkMode } from '../../contexts/DarkModeContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Test component that uses the context
const TestComponent = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <div>
      <span data-testid="dark-mode-status">
        {isDarkMode ? 'dark' : 'light'}
      </span>
      <button data-testid="toggle-button" onClick={toggleDarkMode}>
        Toggle
      </button>
    </div>
  );
};

describe('DarkModeContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    document.documentElement.classList.remove('dark-mode');
  });

  it('provides default light mode when no saved preference', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );
    
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('light');
  });

  it('loads saved dark mode preference from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('true');
    
    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );
    
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('dark');
  });

  it('toggles dark mode and saves to localStorage', () => {
    localStorageMock.getItem.mockReturnValue('false');
    
    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );
    
    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);
    
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true');
  });

  it('applies dark-mode class to document element when in dark mode', () => {
    localStorageMock.getItem.mockReturnValue('true');
    
    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );
    
    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
  });

  it('removes dark-mode class from document element when in light mode', () => {
    localStorageMock.getItem.mockReturnValue('false');
    
    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );
    
    expect(document.documentElement.classList.contains('dark-mode')).toBe(false);
  });

  it('throws error when used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useDarkMode must be used within a DarkModeProvider');
    
    consoleError.mockRestore();
  });
});
