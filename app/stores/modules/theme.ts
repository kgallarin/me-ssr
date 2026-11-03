import type { AppTheme } from '@/types/App.ts';
import { STORAGE_KEYS, THEME } from '~/assets/constants';

export const useThemeStore = defineStore('theme', () => {
  const themeState = ref<AppTheme>(THEME.LIGHT);

  // actions + mutations
  function setTheme(theme: AppTheme) {
    themeState.value = theme;
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  function initializeTheme() {
    if (import.meta.client) {
      const savedTheme =
        (localStorage.getItem(STORAGE_KEYS.THEME) as AppTheme) || THEME.LIGHT;

      setTheme(savedTheme);
    }
  }

  function toggleTheme(): void {
    const newTheme = themeState.value === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    setTheme(newTheme);
  }

  return {
    themeState,
    initializeTheme,
    setTheme,
    toggleTheme,
  };
});
