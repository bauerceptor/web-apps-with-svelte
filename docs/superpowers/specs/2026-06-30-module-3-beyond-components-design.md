# Module 3 — Beyond Components: Design Spec

## Overview

Module 3 moves students from “how do I build a component?” to “how do I manage behavior that lives outside a single component?” It introduces lifecycle effects, shared stores, transitions/actions, and composition/context. The module ends with a capstone that feels like a real mini-app and reuses patterns from every preceding lecture.

**Stack:** SvelteKit, Svelte 5 runes, Deno, Vite, Lightning CSS, Biome.
**Pattern:** Each lecture has a `+page.svelte` overview, a `README.md`, and two project sub-routes. Lecture 20 is a single-project capstone.

## Module-level learning goals

- Know when to use `$effect` and how to clean it up.
- Use Svelte stores (`writable`, `readable`, `derived`) for cross-component state.
- Add motion with `transition`, `animate`, and custom `use:action` directives.
- Compose components with snippets, `bindable`/`snippet` patterns, `setContext`/`getContext`, and special elements (`<svelte:head>`, `<svelte:window>`, `<svelte:element>`).

## Lecture 17 — Lifecycle: `$effect` and cleanup

**Overview page** explains:
- What `$effect` does and how it differs from `$derived`.
- Cleanup functions returned from `$effect`.
- Timing: when effects run, dependency tracking.

**Project 1 — Auto-save Notepad**
A textarea that saves its content to `localStorage` automatically after the user stops typing.
- Uses `$effect` to persist and to restore on mount.
- Cleanup cancels a pending debounce timer.

**Project 2 — Window / Network Status**
A small dashboard that reports online/offline status and viewport size.
- Uses `$effect` to add/remove `online`/`offline` and `resize` listeners.
- Cleanup removes listeners.

## Lecture 18 — Stores: writable, readable, derived

**Overview page** explains:
- Why stores exist and when they complement runes.
- `writable`, `readable`, and `derived`.
- Auto-subscription with `$store` in components.

**Project 1 — Theme Switcher**
A page that toggles light/dark theme.
- `writable` store backed by `localStorage`.
- `$effect` or store subscription applies a class to `<html>`.

**Project 2 — Notification Queue**
A toast/notification system.
- `writable` store holds an array of notifications.
- Components add/remove notifications.
- Derived store computes visible vs total counts.

## Lecture 19 — Transitions, animations & actions

**Overview page** explains:
- Built-in transitions: `fade`, `fly`, `slide`, `scale`, `blur`.
- `in:`, `out:`, and `transition:` directives.
- `animate:flip` for keyed lists.
- Custom actions with `use:actionName`.

**Project 1 — Animated Task List**
A list where items fade/slide in and out and reorder with `flip`.
- Demonstrates keyed `{#each}` with transitions and `animate:flip`.

**Project 2 — Modal with `use:clickOutside` and `use:focusTrap`**
A reusable modal component.
- Custom action closes modal on outside click.
- Optional second action traps focus inside the modal.

## Lecture 20 — Module 3 Capstone: Markdown Notes Workspace

A single-page notes app that brings together Module 3 topics.

**Features:**
- Create, edit, delete, and search markdown notes.
- Notes persisted to `localStorage` via a `writable` store and `$effect`.
- Note list uses transitions/animations when notes are added or removed.
- A `use:clickOutside` action closes the search/filter panel.
- Uses snippets for reusable UI pieces (note card, empty state, toolbar).
- Uses `setContext`/`getContext` for the active-note state shared between sidebar and editor.
- Uses `<svelte:head>` to update the page title with the active note title.
- Uses `<svelte:window>` to listen for keyboard shortcuts (e.g., `Ctrl/Cmd+K` to focus search).
- Uses `<svelte:element>` for dynamic heading levels in rendered markdown previews.

**Components:**
- `NotesWorkspace.svelte` — layout shell.
- `NoteList.svelte` — renders notes, transitions, selection.
- `NoteEditor.svelte` — title/body inputs, preview toggle.
- `SearchBar.svelte` — filter query input.
- `Toolbar.svelte` — add/delete actions.

**Data flow:**
- `notes` writable store in a `notes.svelte.ts` (or `.ts`) module.
- `$effect` in the workspace syncs the store to `localStorage` and handles cleanup.
- `selectedId` via context so nested components know which note is active without prop drilling.
- Markdown rendering is simple HTML via a small marked-like helper (or a pre-installed lightweight library if allowed; otherwise a minimal home-grown parser for bold/italic/headings/lists).

## CSS approach

- Continue the existing design system (CSS custom properties, `Inter`, `Fira Code`, `@layer`).
- Each lecture introduces one or two modern CSS ideas incrementally:
  - Lecture 17: `:focus-visible` and `prefers-reduced-motion`.
  - Lecture 18: `color-scheme` and CSS logical properties.
  - Lecture 19: `@starting-style` or `transition-behavior` (where supported) as a bonus note.
  - Lecture 20: container queries for the workspace layout.

## Error handling

- `localStorage` access is guarded (e.g., check `typeof window !== 'undefined'` where needed).
- Store initialization falls back to a default array.
- Any `fetch`-like effect has a cleanup path.

## Verification

After implementation:
- `deno task format`
- `deno task lint`
- `deno task check`
- `deno task build`
- Spot-check each route in the dev server.

## Out of scope

- Real backend or authentication.
- Full markdown spec support in the capstone (keep it minimal).
- External AI integration (reserved for Module 4).
