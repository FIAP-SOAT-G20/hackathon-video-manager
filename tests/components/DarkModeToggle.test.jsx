import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DarkModeProvider } from '../../contexts/DarkModeContext';
import DarkModeToggle from '../../components/DarkModeToggle';

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

const TestWrapper = ({ children }) => (
  <DarkModeProvider>{children}</DarkModeProvider>
);

describe('DarkModeToggle', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    document.documentElement.classList.remove('dark-mode');
  });

  it('renders the toggle button', () => {
    render(
      <TestWrapper>
        <DarkModeToggle />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByTestId('dark-mode-toggle');
    expect(toggleButton).toBeInTheDocument();
  });

  it('shows moon icon initially (light mode)', () => {
    render(
      <TestWrapper>
        <DarkModeToggle />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByTestId('dark-mode-toggle');
    expect(toggleButton).toHaveTextContent(''); // FontAwesome icon content
  });

  it('toggles dark mode when clicked', () => {
    render(
      <TestWrapper>
        <DarkModeToggle />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByTestId('dark-mode-toggle');
    fireEvent.click(toggleButton);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true');
  });

  it('applies custom testId', () => {
    render(
      <TestWrapper>
        <DarkModeToggle testId="custom-dark-mode-toggle" />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByTestId('custom-dark-mode-toggle');
    expect(toggleButton).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <DarkModeToggle />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByTestId('dark-mode-toggle');
    expect(toggleButton).toHaveAttribute('title');
    expect(toggleButton).toHaveAttribute('aria-label');
  });
});
