import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

const getPreferredTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return getPreferredTheme();
};

export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [hasExplicitPreference, setHasExplicitPreference] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' || saved === 'light';
  });

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return undefined;
    const root = document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (hasExplicitPreference) {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [theme, hasExplicitPreference]);

  useEffect(() => {
    if (typeof window === 'undefined' || hasExplicitPreference) return undefined;
    const matcher = window.matchMedia(MEDIA_QUERY);
    const handler = (event) => setTheme(event.matches ? 'dark' : 'light');
    matcher.addEventListener('change', handler);
    return () => matcher.removeEventListener('change', handler);
  }, [hasExplicitPreference]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    setHasExplicitPreference(true);
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
  };
};
