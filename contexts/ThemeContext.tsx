
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { ThemeType, AppSettings } from '../types';

interface ThemeContextType {
  theme: ThemeType;
  darkMode: boolean;
  customColors?: AppSettings['customColors'];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ settings: AppSettings; children: React.ReactNode }> = ({ settings, children }) => {
  const { theme, darkMode, customColors } = settings;

  useEffect(() => {
    const root = document.documentElement;
    const mode = darkMode ? 'dark' : 'light';
    const activeColors = customColors?.[mode];

    // Reset potential custom overrides from previous mode/settings
    const variables = ['--primary', '--bg-main', '--text-main', '--card-bg', '--border-color'];
    
    if (activeColors) {
      if (activeColors.primary) root.style.setProperty('--primary', activeColors.primary);
      else root.style.removeProperty('--primary');

      if (activeColors.bgMain) root.style.setProperty('--bg-main', activeColors.bgMain);
      else root.style.removeProperty('--bg-main');

      if (activeColors.textMain) root.style.setProperty('--text-main', activeColors.textMain);
      else root.style.removeProperty('--text-main');

      if (activeColors.cardBg) root.style.setProperty('--card-bg', activeColors.cardBg);
      else root.style.removeProperty('--card-bg');

      if (activeColors.border) root.style.setProperty('--border-color', activeColors.border);
      else root.style.removeProperty('--border-color');
    } else {
      // Clear all custom overrides if no custom colors defined for current mode
      variables.forEach(v => root.style.removeProperty(v));
    }
  }, [theme, darkMode, customColors]);

  const value = useMemo(() => ({
    theme,
    darkMode,
    customColors
  }), [theme, darkMode, customColors]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
