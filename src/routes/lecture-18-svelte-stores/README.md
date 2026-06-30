# Lecture 18 — Stores: writable, readable, derived

**Goal:** Use Svelte stores to share reactive state across components and learn how `writable`, `readable`, and `derived` fit together.

**Concepts covered:**
- `writable` for mutable shared state.
- `readable` for read-only values that come from outside the UI.
- `derived` for values computed from other stores.
- Auto-subscription with `$store` inside components.
- Safely reading and writing `localStorage` in a SvelteKit app.

**Projects:**
- **Theme Switcher:** A `writable` store remembers the chosen theme in `localStorage`, and an effect applies a class to `<html>` while respecting the system preference.
- **Notification Queue:** A `writable` store holds an array of toasts. Components add and dismiss notifications, and a `derived` store shows the live count.

**Try changing:** Add a `readable` store that ticks once per second (like a clock) and display it in the notification queue header. Or make the theme switcher also remember the user's accent-color preference.
