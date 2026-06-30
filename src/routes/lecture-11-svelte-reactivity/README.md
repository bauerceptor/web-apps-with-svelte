# Lecture 11 — Runes & Reactivity

**Goal:** Learn how Svelte 5 makes values reactive with runes.

**Concepts covered:**
- `$state` for reactive variables.
- `$derived` for values computed from state.
- `$effect` for side effects that run after the DOM updates.
- Deep reactivity with objects and arrays.
- Reassigning arrays and objects so Svelte sees the change.

**Projects:**
- **Live Counter:** A counter that keeps the browser tab title in sync with `$effect`.
- **Stats Dashboard:** Add and remove numbers, then watch `$derived` stats update instantly.

**Try changing:** In the dashboard, derive the median from the sorted scores.
