import React, { createContext, useContext, useState } from 'react';

// Define possible theme values
type Theme = 'light' | 'dark';

// Interface describing the shape of the theme context
interface ThemeContextType {
  theme: Theme; // current theme mode
  toggleTheme: () => void; // function to toggle between light and dark themes
}

// Create the context with a default value.
// Default theme is 'light' and toggleTheme is a no-op function.
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// Custom hook to access the ThemeContext easily
export const useTheme = () => useContext(ThemeContext);

/**
 * ThemeProvider component wraps the app to provide theme state and toggling functionality.
 * It manages theme state internally and exposes it via context.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Manage theme state, defaulting to 'light'
  const [theme, setTheme] = useState<Theme>('light');

  /**
   * Toggles the theme between 'light' and 'dark'.
   * Uses functional update form to ensure latest state.
   */
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    // Provide theme value and toggle function to all descendants
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};