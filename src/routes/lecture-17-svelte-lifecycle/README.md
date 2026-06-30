# Lecture 17 — Lifecycle: `$effect` and cleanup

**Goal:** Use `$effect` to respond to state changes and return cleanup functions to prevent stale work or memory leaks.

**Concepts covered:**
- `$effect` for running side effects when dependencies change.
- Effect cleanup functions for timeouts, intervals, and event listeners.
- Reading from and writing to `localStorage` safely.
- Guarding browser-only APIs like `window` and `navigator` for SSR.

**Projects:**
- **Auto-Save Notepad:** A textarea that restores saved notes on mount and debounces saves to `localStorage` while you type.
- **Window Status:** A dashboard that tracks online/offline state and viewport dimensions with a single shared effect and cleanup.

**Try changing:** Convert the debounced save to an autosave on every keystroke and add a character counter that updates the document title.
