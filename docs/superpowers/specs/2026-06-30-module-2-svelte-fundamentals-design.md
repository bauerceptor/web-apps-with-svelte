# Module 2 — Svelte 5 Fundamentals Design Spec

**Date:** 2026-06-30  
**Scope:** Replace the skeleton routes for lectures 11–15 with fully implemented Svelte 5 fundamentals lessons.

---

## 1. Goal

Teach the core Svelte 5 concepts that appear in the official Svelte tutorial, plus nuances often skipped, using the same repo structure as Module 1. Each lecture has an overview page, a short README, and two runnable projects.

---

## 2. Syllabus

| Lecture | Topic | Concepts | Projects |
|---------|-------|----------|----------|
| **11 — Runes & Reactivity** | `$state`, `$derived`, `$effect` | Deep reactivity, immutable updates for arrays/objects, `$effect` vs `$derived`, cleanup in `$effect` | Live counter with document title, Derived stats dashboard |
| **12 — Props** | `$props`, defaults, spread | Passing data down, default prop values, spreading props, component boundaries | Card component gallery, User profile builder |
| **13 — Logic Blocks** | `{#if}`, `{#each}` keyed, `{#await}` | Conditional rendering, keyed loops for stateful items, async data | Async quote fetcher, Keyed todo list with reorder |
| **14 — Events** | DOM events, modifiers, component events | `onclick`, `oninput`, `|preventDefault`, `|stopPropagation`, forwarding custom events | Event modifier playground, Custom stepper component |
| **15 — Bindings** | `bind:value`, `bind:checked`, `bind:this`, `bind:group` | Two-way binding for inputs, element refs, grouped inputs | Settings form, Survey poll |
| **16 — Module 2 Capstone** | All Module 2 concepts combined | Build a dashboard that uses runes, props, logic blocks, events, and bindings together | Interactive task dashboard |

---

## 3. File changes

### New/updated files

- `src/routes/+page.svelte` — update the lecture list to include lectures 11–15.
- `src/routes/lecture-11-svelte-reactivity/README.md`
- `src/routes/lecture-11-svelte-reactivity/+page.svelte`
- `src/routes/lecture-11-svelte-reactivity/project-01-live-counter/+page.svelte`
- `src/routes/lecture-11-svelte-reactivity/project-02-stats-dashboard/+page.svelte`
- `src/routes/lecture-12-svelte-props/README.md`
- `src/routes/lecture-12-svelte-props/+page.svelte`
- `src/routes/lecture-12-svelte-props/project-01-card-gallery/+page.svelte`
- `src/routes/lecture-12-svelte-props/project-02-profile-builder/+page.svelte`
- `src/routes/lecture-13-svelte-logic/README.md`
- `src/routes/lecture-13-svelte-logic/+page.svelte`
- `src/routes/lecture-13-svelte-logic/project-01-async-quote/+page.svelte`
- `src/routes/lecture-13-svelte-logic/project-02-keyed-todo/+page.svelte`
- `src/routes/lecture-14-svelte-events/README.md`
- `src/routes/lecture-14-svelte-events/+page.svelte`
- `src/routes/lecture-14-svelte-events/project-01-event-playground/+page.svelte`
- `src/routes/lecture-14-svelte-events/project-02-stepper/+page.svelte`
- `src/routes/lecture-15-svelte-bindings/README.md`
- `src/routes/lecture-15-svelte-bindings/+page.svelte`
- `src/routes/lecture-15-svelte-bindings/project-01-settings-form/+page.svelte`
- `src/routes/lecture-15-svelte-bindings/project-02-survey-poll/+page.svelte`
- `src/routes/lecture-16-module-2-capstone/README.md`
- `src/routes/lecture-16-module-2-capstone/+page.svelte`

### CSS integration

Each lecture introduces one modern CSS feature:

| Lecture | CSS topic |
|---------|-----------|
| 11 | CSS `transition` property |
| 12 | `:is()` and `:where()` selectors |
| 13 | Scoped CSS custom properties for components |
| 14 | `@keyframes` animations |
| 15 | `@layer` cascade layers |
| 16 | Capstone: combine all Module 2 CSS techniques |

---

## 4. Nuances to cover

- **Runes:** `$state` creates deep reactivity, but arrays/objects must be reassigned for Svelte to notice mutations unless using runes correctly.
- **`$derived` vs `$effect`:** `$derived` is for values that depend on state; `$effect` is for side effects. Show both.
- **Keyed `{#each}`:** Explain why a stable key matters when list items have their own state.
- **Component events:** Use callback props (the Svelte 5 idiomatic way) instead of the legacy event dispatcher.
- **Bindings:** Explain that `bind:value` is shorthand for `value` + `oninput`.

---

## 5. Content style

- Brief README per lecture with goal, concepts, project list, and one try-it prompt.
- Code comments explain why, not what.
- No emojis, no filler text.
- TypeScript stays light: simple prop types, no generics.
