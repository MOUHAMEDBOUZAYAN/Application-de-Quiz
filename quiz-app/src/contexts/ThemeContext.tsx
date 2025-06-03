import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'auto';
    }
    return 'auto';
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  // Fonction pour détecter le thème système
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Résoudre le thème actuel
  const resolveTheme = (currentTheme: Theme): ResolvedTheme => {
    if (currentTheme === 'auto') {
      return getSystemTheme();
    }
    return currentTheme;
  };

  // Appliquer le thème au document
  const applyTheme = (newResolvedTheme: ResolvedTheme) => {
    const root = window.document.documentElement;
    
    if (newResolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Effet pour écouter les changements de thème système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'auto') {
        const newResolvedTheme = getSystemTheme();
        setResolvedTheme(newResolvedTheme);
        applyTheme(newResolvedTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Effet pour appliquer le thème au changement
  useEffect(() => {
    const newResolvedTheme = resolveTheme(theme);
    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Initialisation du thème
  useEffect(() => {
    const newResolvedTheme = resolveTheme(theme);
    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      resolvedTheme,
      setTheme: handleSetTheme,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook pour obtenir les classes CSS selon le thème
export function useThemeClasses() {
  const { resolvedTheme } = useTheme();
  
  return {
    // Backgrounds
    bgPrimary: resolvedTheme === 'dark' 
      ? 'bg-gray-900' 
      : 'bg-white',
    bgSecondary: resolvedTheme === 'dark' 
      ? 'bg-gray-800' 
      : 'bg-gray-50',
    bgTertiary: resolvedTheme === 'dark' 
      ? 'bg-gray-700' 
      : 'bg-gray-100',
    bgGradient: resolvedTheme === 'dark'
      ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    bgCard: resolvedTheme === 'dark'
      ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/50'
      : 'bg-white/80 backdrop-blur-xl border-white/20',
    
    // Textes
    textPrimary: resolvedTheme === 'dark' 
      ? 'text-white' 
      : 'text-gray-900',
    textSecondary: resolvedTheme === 'dark' 
      ? 'text-gray-300' 
      : 'text-gray-600',
    textMuted: resolvedTheme === 'dark' 
      ? 'text-gray-400' 
      : 'text-gray-500',
    
    // Borders
    border: resolvedTheme === 'dark' 
      ? 'border-gray-700' 
      : 'border-gray-200',
    borderLight: resolvedTheme === 'dark' 
      ? 'border-gray-600' 
      : 'border-gray-300',
    
    // Hovers
    hoverBg: resolvedTheme === 'dark' 
      ? 'hover:bg-gray-700' 
      : 'hover:bg-gray-50',
    hoverBgSecondary: resolvedTheme === 'dark' 
      ? 'hover:bg-gray-600' 
      : 'hover:bg-gray-100',
    
    // Inputs
    inputBg: resolvedTheme === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
    
    // Navbar
    navbarBg: resolvedTheme === 'dark'
      ? 'bg-gray-900/95 backdrop-blur-md border-gray-800'
      : 'bg-white/95 backdrop-blur-md border-gray-200',
    
    // Shadows
    shadow: resolvedTheme === 'dark' 
      ? 'shadow-2xl shadow-black/25' 
      : 'shadow-xl shadow-gray-200/50',
    shadowCard: resolvedTheme === 'dark' 
      ? 'shadow-lg shadow-black/20' 
      : 'shadow-md shadow-gray-200/50',
  };
}