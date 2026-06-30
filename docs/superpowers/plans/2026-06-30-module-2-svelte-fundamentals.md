# Module 2: Svelte 5 Fundamentals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the skeleton routes for lectures 11–16 with fully implemented Svelte 5 fundamentals lessons and update the course index.

**Architecture:** Same SvelteKit project structure as Module 1. Each lecture is a route with sub-routes for projects. The course index at `src/routes/+page.svelte` is extended to include lectures 11–16.

**Tech Stack:** Deno, Vite, SvelteKit, Svelte 5, TypeScript (light annotations), Biome, Lightning CSS.

---

## File map

| File | Responsibility |
|------|----------------|
| `src/routes/+page.svelte` | Updated course index listing lectures 01–16 |
| `src/routes/lecture-11-svelte-reactivity/*` | Runes and reactivity |
| `src/routes/lecture-12-svelte-props/*` | Props |
| `src/routes/lecture-13-svelte-logic/*` | Logic blocks |
| `src/routes/lecture-14-svelte-events/*` | Events |
| `src/routes/lecture-15-svelte-bindings/*` | Bindings |
| `src/routes/lecture-16-module-2-capstone/*` | Capstone dashboard |

---

## Shared conventions

- Each lecture has `README.md`, `+page.svelte`, and two project sub-routes.
- Use Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`).
- TypeScript annotations stay light: `let count: number = $state(0)`, typed function parameters, simple prop interfaces.
- CSS uses shared custom properties from `src/lib/styles/theme.css`.
- No emojis, no filler text.
- Comments explain why, not what.

---

### Task 1: Update course index

**Files:**
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Add lectures 11–16 to the lectures array**

The array should now include:

```ts
{ num: 11, slug: 'lecture-11-svelte-reactivity', title: 'Runes & Reactivity' },
{ num: 12, slug: 'lecture-12-svelte-props', title: 'Props' },
{ num: 13, slug: 'lecture-13-svelte-logic', title: 'Logic Blocks' },
{ num: 14, slug: 'lecture-14-svelte-events', title: 'Events' },
{ num: 15, slug: 'lecture-15-svelte-bindings', title: 'Bindings' },
{ num: 16, slug: 'lecture-16-module-2-capstone', title: 'Capstone: Task Dashboard' }
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: add Module 2 lectures to course index"
```

---

### Task 2: Lecture 11 — Runes & Reactivity

**Goal:** Teach `$state`, `$derived`, and `$effect`, including reactivity nuances.

**Files:**
- Create: `src/routes/lecture-11-svelte-reactivity/README.md`
- Create: `src/routes/lecture-11-svelte-reactivity/+page.svelte`
- Create: `src/routes/lecture-11-svelte-reactivity/project-01-live-counter/+page.svelte`
- Create: `src/routes/lecture-11-svelte-reactivity/project-02-stats-dashboard/+page.svelte`

**Requirements:**
- README explains runes, deep reactivity, and `$effect` vs `$derived`.
- Project 1: Counter that uses `$effect` to update `document.title`. Show that `$effect` runs after DOM updates.
- Project 2: Dashboard with multiple `$state` values and `$derived` values (e.g., sum, average). Include an array where items are added/removed to demonstrate reassignment for reactivity.
- Use CSS `transition` for visual feedback.

- [ ] **Step 1: Create all files**
- [ ] **Step 2: Verify `/lecture-11-svelte-reactivity` renders**
- [ ] **Step 3: Commit**

```bash
git add src/routes/lecture-11-svelte-reactivity
git commit -m "feat: add lecture 11 - runes and reactivity"
```

---

### Task 3: Lecture 12 — Props

**Goal:** Teach `$props`, default values, and spreading props.

**Files:**
- Create: `src/routes/lecture-12-svelte-props/README.md`
- Create: `src/routes/lecture-12-svelte-props/+page.svelte`
- Create: `src/routes/lecture-12-svelte-props/project-01-card-gallery/+page.svelte`
- Create: `src/routes/lecture-12-svelte-props/project-02-profile-builder/+page.svelte`

**Requirements:**
- README explains `$props` and default props.
- Project 1: A `Card` component defined inside the same file (a snippet or a child component) that receives `title`, `description`, and optional `highlighted` props. Render a gallery of cards.
- Project 2: A `ProfileCard` component that receives a user object and displays it. Include inputs to edit the user and show that props are reactive when the parent state changes.
- Use `:is()` and `:where()` selectors in CSS.

- [ ] **Step 1: Create all files**
- [ ] **Step 2: Verify `/lecture-12-svelte-props` renders**
- [ ] **Step 3: Commit**

```bash
git add src/routes/lecture-12-svelte-props
git commit -m "feat: add lecture 12 - props"
```

---

### Task 4: Lecture 13 — Logic Blocks

**Goal:** Teach `{#if}`, keyed `{#each}`, and `{#await}`.

**Files:**
- Create: `src/routes/lecture-13-svelte-logic/README.md`
- Create: `src/routes/lecture-13-svelte-logic/+page.svelte`
- Create: `src/routes/lecture-13-svelte-logic/project-01-async-quote/+page.svelte`
- Create: `src/routes/lecture-13-svelte-logic/project-02-keyed-todo/+page.svelte`

**Requirements:**
- README explains the logic blocks and why keyed `{#each}` matters.
- Project 1: A button fetches a quote from a public API (e.g., `https://api.quotable.io/random` or a static fallback). Use `{#await}` for loading, success, and error states.
- Project 2: A todo list where each item has its own editable state. Include buttons to reorder the list. Use keyed `{#each}` so state survives reordering.
- Use scoped CSS custom properties for components.

- [ ] **Step 1: Create all files**
- [ ] **Step 2: Verify `/lecture-13-svelte-logic` renders**
- [ ] **Step 3: Commit**

```bash
git add src/routes/lecture-13-svelte-logic
git commit -m "feat: add lecture 13 - logic blocks"
```

---

### Task 5: Lecture 14 — Events

**Goal:** Teach DOM events, modifiers, and component events via callback props.

**Files:**
- Create: `src/routes/lecture-14-svelte-events/README.md`
- Create: `src/routes/lecture-14-svelte-events/+page.svelte`
- Create: `src/routes/lecture-14-svelte-events/project-01-event-playground/+page.svelte`
- Create: `src/routes/lecture-14-svelte-events/project-02-stepper/+page.svelte`

**Requirements:**
- README explains DOM events, modifiers, and callback props for component events.
- Project 1: A form with `|preventDefault`, `|stopPropagation`, and keyboard event demos. Show a log of captured events.
- Project 2: A reusable `Stepper` component with `+`, `-`, and reset buttons that calls back to the parent via props. Parent shows the final value.
- Use CSS `@keyframes` for button press animations.

- [ ] **Step 1: Create all files**
- [ ] **Step 2: Verify `/lecture-14-svelte-events` renders**
- [ ] **Step 3: Commit**

```bash
git add src/routes/lecture-14-svelte-events
git commit -m "feat: add lecture 14 - events"
```

---

### Task 6: Lecture 15 — Bindings

**Goal:** Teach two-way bindings for inputs, elements, and groups.

**Files:**
- Create: `src/routes/lecture-15-svelte-bindings/README.md`
- Create: `src/routes/lecture-15-svelte-bindings/+page.svelte`
- Create: `src/routes/lecture-15-svelte-bindings/project-01-settings-form/+page.svelte`
- Create: `src/routes/lecture-15-svelte-bindings/project-02-survey-poll/+page.svelte`

**Requirements:**
- README explains `bind:value`, `bind:checked`, `bind:this`, and `bind:group`.
- Project 1: A settings form with text inputs, checkboxes, a select, and a textarea, all bound to a single settings object.
- Project 2: A survey poll using `bind:group` for radio buttons and checkboxes. Show live results with a simple bar chart (HTML/CSS, no library).
- Use CSS `@layer` to organize styles.

- [ ] **Step 1: Create all files**
- [ ] **Step 2: Verify `/lecture-15-svelte-bindings` renders**
- [ ] **Step 3: Commit**

```bash
git add src/routes/lecture-15-svelte-bindings
git commit -m "feat: add lecture 15 - bindings"
```

---

### Task 7: Lecture 16 — Module 2 Capstone

**Goal:** Combine all Module 2 concepts into one app.

**Files:**
- Create: `src/routes/lecture-16-module-2-capstone/README.md`
- Create: `src/routes/lecture-16-module-2-capstone/+page.svelte`

The capstone is a single project at the lecture root, following the same pattern as the Module 1 capstone.

**Requirements:**
- Build a "Task Dashboard" that uses:
  - `$state` and `$derived` for task stats.
  - A child `TaskCard` component that receives props and emits events.
  - `{#each}` with keys to render tasks.
  - `bind:value` for adding/editing tasks.
  - `{#if}` for empty states and filters.
- CSS combines transitions, `:is()`, custom properties, and `@layer`.

- [ ] **Step 1: Create all files**
- [ ] **Step 2: Verify `/lecture-16-module-2-capstone` renders**
- [ ] **Step 3: Commit**

```bash
git add src/routes/lecture-16-module-2-capstone
git commit -m "feat: add module 2 capstone - task dashboard"
```

---

### Task 8: Final verification

- [ ] **Step 1: Format**

```bash
deno task format
```

Expected: no changes needed.

- [ ] **Step 2: Lint**

```bash
deno task lint
```

Expected: no lint errors.

- [ ] **Step 3: Type-check**

```bash
deno task check
```

Expected: 0 errors, 0 warnings.

- [ ] **Step 4: Build**

```bash
deno task build
```

Expected: build succeeds.

- [ ] **Step 5: Spot-check routes**

Start the dev server and verify these routes return their expected headings:

```bash
deno task dev > /tmp/dev.log 2>&1 &
PID=$!
sleep 10
curl -s http://localhost:5173/ | grep -o 'Web Apps with Svelte'
curl -s http://localhost:5173/lecture-11-svelte-reactivity | grep -o 'Runes'
curl -s http://localhost:5173/lecture-13-svelte-logic | grep -o 'Logic'
curl -s http://localhost:5173/lecture-16-module-2-capstone | grep -o 'Dashboard'
kill $PID 2>/dev/null || true
```

Expected: all grep checks return matches.

- [ ] **Step 6: Commit any fixes and push**

```bash
git add -A
git diff --cached --quiet || git commit -m "style: format and check Module 2"
git push
```

---

## Plan self-review

- Spec coverage: all lectures 11–16 and course index update are covered.
- No placeholders: each task has concrete requirements and verification steps.
- Consistency: uses the same patterns as Module 1.
