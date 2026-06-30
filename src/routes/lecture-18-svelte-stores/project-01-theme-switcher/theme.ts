import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'lecture-18-theme';

export type ThemeStore = ReturnType<typeof createThemeStore>;

function createThemeStore() {
  const store = writable<Theme>('system');

  function init() {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        store.set(stored);
      }
    } catch {
      // Ignore storage errors during initialization.
    }
  }

  if (typeof window !== 'undefined') {
    store.subscribe((value) => {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // Ignore storage errors during persistence.
      }
    });
  }

  return {
    ...store,
    init,
  };
}

export const theme = createThemeStore();
