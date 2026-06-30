import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'lecture-18-theme';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // Ignore storage errors.
  }
  return 'system';
}

function createThemeStore() {
  const store = writable<Theme>(getStoredTheme());

  if (typeof window !== 'undefined') {
    store.subscribe((value) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // Ignore storage errors during persistence.
      }
    });
  }

  return store;
}

export const theme = createThemeStore();
