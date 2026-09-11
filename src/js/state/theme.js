/**
 * Theme State Manager (Light / Dark Mode)
 * Menyinkronkan tema dengan preferensi sistem & localStorage
 */

const STORAGE_KEY = 'lex_theme';

class ThemeManager {
  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      this.currentTheme = saved;
    } else {
      // Default to light mode for crisp legal readability, or system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }
    this.applyTheme();
  }

  getTheme() {
    return this.currentTheme;
  }

  isDark() {
    return this.currentTheme === 'dark';
  }

  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    this.currentTheme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    this.applyTheme();
  }

  toggleTheme() {
    const next = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    document.documentElement.style.colorScheme = this.currentTheme;
  }
}

export const themeState = new ThemeManager();
