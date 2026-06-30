# Module 3 — Beyond Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Svelte course Module 3 (lectures 17–20): lifecycle effects, stores, transitions/actions, and the Markdown Notes Workspace capstone.

**Architecture:** Each lecture follows the established pattern of an overview `+page.svelte` + `README.md` + two project sub-routes. Lecture 20 is a single-project capstone with multiple components. Shared state uses Svelte stores, context, and `$effect`. Styling continues the existing CSS-variable design system.

**Tech Stack:** SvelteKit, Svelte 5 runes, Deno, Vite, Lightning CSS, Biome.

---

## File structure

Files to create / modify:

- `src/routes/+page.svelte` — add lectures 17–20 to the course index.
- `SYLLABUS.md` — update lecture 20 title to capstone.
- `src/routes/lecture-17-svelte-lifecycle/` — overview, README, two projects.
- `src/routes/lecture-18-svelte-stores/` — overview, README, two projects.
- `src/routes/lecture-19-svelte-transitions/` — overview, README, two projects.
- `src/routes/lecture-20-module-3-capstone/` — overview, README, capstone page + components + helpers.

The existing placeholder `src/routes/lecture-20-svelte-composition/` will be removed.

---

### Task 1: Create isolated worktree and verify baseline

**Files:**
- Create branch: `module-3`
- Create worktree: `.worktrees/module-3`

- [ ] **Step 1: Create branch and worktree**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte"
git checkout -b module-3
git worktree add ".worktrees/module-3" module-3
cd ".worktrees/module-3"
```

- [ ] **Step 2: Install Deno locally in the worktree**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
curl -fsSL https://deno.land/install.sh | DENO_INSTALL="$PWD/.deno" sh
export PATH="$PWD/.deno/bin:$PATH"
deno --version
```

Expected output shows `deno 2.x.x`.

- [ ] **Step 3: Verify baseline checks pass**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
export PATH="$PWD/.deno/bin:$PATH"
deno task format
deno task lint
deno task check
deno task build
```

Expected: format, lint, check, and build all succeed with zero errors.

- [ ] **Step 4: Commit baseline marker**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git commit --allow-empty -m "chore: start module-3 worktree"
git push -u origin module-3
```

---

### Task 2: Update course index for lectures 17–20

**Files:**
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Add new lectures to the array**

Replace the existing `lectures` array with the extended list:

```svelte
<script lang="ts">
  const lectures = [
    { num: 1, slug: 'lecture-01-io', title: 'Input / Output & Variables' },
    { num: 2, slug: 'lecture-02-types-and-operators', title: 'Numbers, Strings & Operators' },
    { num: 3, slug: 'lecture-03-comparisons-and-booleans', title: 'Comparisons & Booleans' },
    { num: 4, slug: 'lecture-04-if-else', title: 'If / Else' },
    { num: 5, slug: 'lecture-05-loops', title: 'Loops' },
    { num: 6, slug: 'lecture-06-functions', title: 'Functions' },
    { num: 7, slug: 'lecture-07-events', title: 'Events' },
    { num: 8, slug: 'lecture-08-arrays', title: 'Arrays' },
    { num: 9, slug: 'lecture-09-objects', title: 'Objects' },
    { num: 10, slug: 'lecture-10-capstone', title: 'Capstone: Flashcard Quiz' },
    { num: 11, slug: 'lecture-11-svelte-reactivity', title: 'Reactivity with Runes' },
    { num: 12, slug: 'lecture-12-svelte-props', title: 'Props' },
    { num: 13, slug: 'lecture-13-svelte-logic', title: 'Logic Blocks' },
    { num: 14, slug: 'lecture-14-svelte-events', title: 'Events' },
    { num: 15, slug: 'lecture-15-svelte-bindings', title: 'Bindings' },
    { num: 16, slug: 'lecture-16-module-2-capstone', title: 'Capstone: Task Dashboard' },
    { num: 17, slug: 'lecture-17-svelte-lifecycle', title: 'Lifecycle' },
    { num: 18, slug: 'lecture-18-svelte-stores', title: 'Stores' },
    { num: 19, slug: 'lecture-19-svelte-transitions', title: 'Transitions & Actions' },
    { num: 20, slug: 'lecture-20-module-3-capstone', title: 'Capstone: Markdown Notes' },
  ];
</script>
```

- [ ] **Step 2: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/+page.svelte
git commit -m "feat: add lectures 17-20 to course index"
```

---

### Task 3: Lecture 17 overview and README

**Files:**
- Create: `src/routes/lecture-17-svelte-lifecycle/+page.svelte`
- Create: `src/routes/lecture-17-svelte-lifecycle/README.md`

- [ ] **Step 1: Write overview page**

```svelte
<script lang="ts">
const projects = [
  { slug: 'project-01-auto-save-notepad', title: 'Auto-save Notepad' },
  { slug: 'project-02-window-status', title: 'Window & Network Status' },
];
</script>

<div class="card stack">
  <h1>Lifecycle</h1>

  <p>
    Effects let a component reach outside itself: talk to the DOM, subscribe to
    browser events, or sync with storage. Unlike derived values, effects run
    after rendering and can clean up after themselves.
  </p>

  <ul class="concept-list">
    <li><code>$effect</code> runs when its dependencies change.</li>
    <li>Return a cleanup function to remove listeners or cancel timers.</li>
    <li>Effects are for side effects, not for computing values.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-17-svelte-lifecycle/{project.slug}">
          {project.title}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .concept-list {
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
  }

  .concept-list li {
    margin-block: var(--space-sm);
  }

  .project-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-link {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .project-link:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }
</style>
```

- [ ] **Step 2: Write README**

```markdown
# Lecture 17 — Lifecycle

**Goal:** React to component lifetime and external events with effects and cleanup.

**Concepts covered:**
- `$effect` and when it runs.
- Cleanup functions for timers, listeners, and subscriptions.
- The difference between `$effect` and `$derived`.

**Projects:**
- **Auto-save Notepad:** Persist textarea content to `localStorage` with debounced saves.
- **Window & Network Status:** Subscribe to browser `online`, `offline`, and `resize` events.

**Try changing:** Convert the debounced save into a custom `use:autoSave` action.
```

- [ ] **Step 3: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-17-svelte-lifecycle
git commit -m "feat: add lecture 17 lifecycle overview and readme"
```

---

### Task 4: Lecture 17 Project 1 — Auto-save Notepad

**Files:**
- Create: `src/routes/lecture-17-svelte-lifecycle/project-01-auto-save-notepad/+page.svelte`

- [ ] **Step 1: Write the page**

```svelte
<script lang="ts">
const STORAGE_KEY = 'lecture-17-notepad';

let note = $state('');
let savedAt = $state<Date | null>(null);
let status = $state('Start typing…');

$effect(() => {
  if (typeof window === 'undefined') return;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved) {
    note = saved;
    status = 'Restored from storage';
  }
});

$effect(() => {
  if (typeof window === 'undefined') return;
  const text = note;
  status = 'Typing…';
  const timeout = setTimeout(() => {
    window.localStorage.setItem(STORAGE_KEY, text);
    savedAt = new Date();
    status = 'Saved';
  }, 500);

  return () => clearTimeout(timeout);
});
</script>

<div class="card stack notepad">
  <h2>Auto-save Notepad</h2>
  <p class="status" aria-live="polite">{status}</p>

  <textarea
    bind:value={note}
    rows="10"
    placeholder="Type something here…"
  ></textarea>

  {#if savedAt}
    <p class="saved-at">Last saved at {savedAt.toLocaleTimeString()}</p>
  {/if}
</div>

<style>
  .notepad {
    gap: var(--space-md);
  }

  .status {
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }

  textarea {
    width: 100%;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-family: var(--font-body);
    font-size: 1rem;
    resize: vertical;
  }

  textarea:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .saved-at {
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-17-svelte-lifecycle/project-01-auto-save-notepad
git commit -m "feat: add lecture 17 project 1 auto-save notepad"
```

---

### Task 5: Lecture 17 Project 2 — Window & Network Status

**Files:**
- Create: `src/routes/lecture-17-svelte-lifecycle/project-02-window-status/+page.svelte`

- [ ] **Step 1: Write the page**

```svelte
<script lang="ts">
let online = $state(true);
let width = $state(0);
let height = $state(0);

$effect(() => {
  if (typeof window === 'undefined') return;

  online = window.navigator.onLine;
  width = window.innerWidth;
  height = window.innerHeight;

  const onOnline = () => (online = true);
  const onOffline = () => (online = false);
  const onResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
  };

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
    window.removeEventListener('resize', onResize);
  };
});
</script>

<div class="card stack status-dashboard">
  <h2>Window & Network Status</h2>

  <div class="row indicators">
    <div class="indicator" class:good={online} class:bad={!online}>
      <span class="indicator-label">Network</span>
      <span class="indicator-value">{online ? 'Online' : 'Offline'}</span>
    </div>
    <div class="indicator">
      <span class="indicator-label">Viewport</span>
      <span class="indicator-value">{width} × {height}</span>
    </div>
  </div>
</div>

<style>
  .status-dashboard {
    gap: var(--space-lg);
  }

  .indicators {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: var(--space-md);
  }

  .indicator {
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .indicator.good {
    border-color: var(--color-success);
  }

  .indicator.bad {
    border-color: var(--color-error);
  }

  .indicator-label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  .indicator-value {
    font-size: 1.25rem;
    font-weight: 700;
    font-family: var(--font-mono);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-17-svelte-lifecycle/project-02-window-status
git commit -m "feat: add lecture 17 project 2 window status"
```

---

### Task 6: Lecture 18 overview and README

**Files:**
- Create: `src/routes/lecture-18-svelte-stores/+page.svelte`
- Create: `src/routes/lecture-18-svelte-stores/README.md`

- [ ] **Step 1: Write overview page**

```svelte
<script lang="ts">
const projects = [
  { slug: 'project-01-theme-switcher', title: 'Theme Switcher' },
  { slug: 'project-02-notification-queue', title: 'Notification Queue' },
];
</script>

<div class="card stack">
  <h1>Stores</h1>

  <p>
    Stores are Svelte's way to share state across components that don't have a
    direct parent-child relationship. Any component can subscribe, and any code
    can update the store.
  </p>

  <ul class="concept-list">
    <li><code>writable</code> stores can be updated from anywhere.</li>
    <li><code>readable</code> stores expose a value produced internally.</li>
    <li><code>derived</code> stores compute values from other stores.</li>
    <li>Prefix a store with <code>$</code> to auto-subscribe in a component.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-18-svelte-stores/{project.slug}">
          {project.title}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .concept-list {
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
  }

  .concept-list li {
    margin-block: var(--space-sm);
  }

  .project-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-link {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .project-link:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }
</style>
```

- [ ] **Step 2: Write README**

```markdown
# Lecture 18 — Stores

**Goal:** Share state between components with Svelte stores.

**Concepts covered:**
- `writable`, `readable`, and `derived` stores.
- Auto-subscription with `$store`.
- Stores backed by `localStorage`.

**Projects:**
- **Theme Switcher:** A `writable` store persists the chosen theme and applies it to the page.
- **Notification Queue:** A store-driven toast system with derived counts.

**Try changing:** Add a `readable` store that ticks every second and display it in the notification bar.
```

- [ ] **Step 3: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-18-svelte-stores
git commit -m "feat: add lecture 18 stores overview and readme"
```

---

### Task 7: Lecture 18 Project 1 — Theme Switcher

**Files:**
- Create: `src/routes/lecture-18-svelte-stores/project-01-theme-switcher/+page.svelte`
- Create: `src/routes/lecture-18-svelte-stores/project-01-theme-switcher/theme.ts`

- [ ] **Step 1: Write the store module**

```ts
import { writable } from 'svelte/store';

const STORAGE_KEY = 'lecture-18-theme';

type Theme = 'light' | 'dark' | 'system';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  return 'system';
}

function createThemeStore() {
  const store = writable<Theme>(getInitialTheme());

  return {
    subscribe: store.subscribe,
    set(value: Theme) {
      store.set(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, value);
      }
    },
  };
}

export const theme = createThemeStore();
export type { Theme };
```

- [ ] **Step 2: Write the page**

```svelte
<script lang="ts">
import { theme, type Theme } from './theme';

const options: Theme[] = ['light', 'dark', 'system'];

$effect(() => {
  if (typeof document === 'undefined') return;
  const value = $theme;
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  if (value === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.add(prefersDark ? 'dark' : 'light');
  } else {
    root.classList.add(value);
  }
});
</script>

<div class="card stack">
  <h2>Theme Switcher</h2>

  <p>Choose a theme. The store persists your choice in <code>localStorage</code>.</p>

  <div class="row theme-options">
    {#each options as option}
      <button
        class="theme-button"
        class:active={$theme === option}
        onclick={() => theme.set(option)}
      >
        {option}
      </button>
    {/each}
  </div>

  <p class="current">Current theme: <strong>{$theme}</strong></p>
</div>

<style>
  .theme-options {
    gap: var(--space-sm);
  }

  .theme-button {
    flex: 1;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    cursor: pointer;
    text-transform: capitalize;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
  }

  .theme-button.active {
    background: var(--color-primary);
    color: var(--color-primary-text);
    border-color: var(--color-primary);
  }

  .current {
    color: var(--color-text-muted);
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-18-svelte-stores/project-01-theme-switcher
git commit -m "feat: add lecture 18 project 1 theme switcher"
```

---

### Task 8: Lecture 18 Project 2 — Notification Queue

**Files:**
- Create: `src/routes/lecture-18-svelte-stores/project-02-notification-queue/+page.svelte`
- Create: `src/routes/lecture-18-svelte-stores/project-02-notification-queue/notifications.ts`

- [ ] **Step 1: Write the store module**

```ts
import { writable, derived } from 'svelte/store';

export type Notification = {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
};

function createNotificationStore() {
  const store = writable<Notification[]>([]);
  const { subscribe, update } = store;

  return {
    subscribe,
    add(message: string, type: Notification['type'] = 'info') {
      const id = Date.now();
      update((items) => [...items, { id, message, type }]);
      setTimeout(() => {
        update((items) => items.filter((item) => item.id !== id));
      }, 4000);
    },
    dismiss(id: number) {
      update((items) => items.filter((item) => item.id !== id));
    },
    count: derived(store, ($items) => $items.length),
  };
}

export const notifications = createNotificationStore();
```

- [ ] **Step 2: Write the page**

```svelte
<script lang="ts">
import { notifications } from './notifications';

let message = $state('');
let type: 'info' | 'success' | 'error' = $state('info');

function addNotification() {
  if (message.trim() === '') return;
  notifications.add(message.trim(), type);
  message = '';
}
</script>

<div class="card stack queue">
  <h2>Notification Queue</h2>

  <form class="row add-form" onsubmit={(event) => { event.preventDefault(); addNotification(); }}>
    <input type="text" bind:value={message} placeholder="Notification message" />
    <select bind:value={type}>
      <option value="info">Info</option>
      <option value="success">Success</option>
      <option value="error">Error</option>
    </select>
    <button type="submit">Notify</button>
  </form>

  <p class="count">Active notifications: {$notifications.count}</p>

  <ul class="toast-list">
    {#each $notifications as note (note.id)}
      <li class="toast" class:success={note.type === 'success'} class:error={note.type === 'error'}>
        <span>{note.message}</span>
        <button onclick={() => notifications.dismiss(note.id)} aria-label="Dismiss">×</button>
      </li>
    {:else}
      <li class="empty">No notifications yet.</li>
    {/each}
  </ul>
</div>

<style>
  .queue {
    gap: var(--space-md);
  }

  .add-form {
    gap: var(--space-sm);
    flex-wrap: wrap;
  }

  .add-form input {
    flex: 1;
    min-width: 12rem;
  }

  .count {
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }

  .toast-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .toast {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md);
    background: var(--color-surface);
    border-inline-start: 4px solid var(--color-primary);
    border-radius: var(--radius);
  }

  .toast.success {
    border-inline-start-color: var(--color-success);
  }

  .toast.error {
    border-inline-start-color: var(--color-error);
  }

  .toast button {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    font-size: 1.25rem;
    cursor: pointer;
  }

  .empty {
    color: var(--color-text-muted);
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-18-svelte-stores/project-02-notification-queue
git commit -m "feat: add lecture 18 project 2 notification queue"
```

---

### Task 9: Lecture 19 overview and README

**Files:**
- Create: `src/routes/lecture-19-svelte-transitions/+page.svelte`
- Create: `src/routes/lecture-19-svelte-transitions/README.md`

- [ ] **Step 1: Write overview page**

```svelte
<script lang="ts">
const projects = [
  { slug: 'project-01-animated-task-list', title: 'Animated Task List' },
  { slug: 'project-02-modal-actions', title: 'Modal with Actions' },
];
</script>

<div class="card stack">
  <h1>Transitions & Actions</h1>

  <p>
    Motion and reusable DOM behavior help interfaces feel polished. Svelte makes
    it easy to animate elements entering and leaving the DOM, and to package
    reusable DOM logic as actions.
  </p>

  <ul class="concept-list">
    <li><code>transition:</code>, <code>in:</code>, and <code>out:</code> directives.</li>
    <li>Built-in transitions: <code>fade</code>, <code>fly</code>, <code>slide</code>, <code>scale</code>, <code>blur</code>.</li>
    <li><code>animate:flip</code> for smooth list reordering.</li>
    <li>Custom actions with <code>use:actionName</code>.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-19-svelte-transitions/{project.slug}">
          {project.title}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .concept-list {
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
  }

  .concept-list li {
    margin-block: var(--space-sm);
  }

  .project-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-link {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .project-link:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }
</style>
```

- [ ] **Step 2: Write README**

```markdown
# Lecture 19 — Transitions & Actions

**Goal:** Add motion and reusable DOM behavior to components.

**Concepts covered:**
- Built-in transitions and transition directives.
- `animate:flip` for keyed lists.
- Custom actions such as `use:clickOutside` and `use:focusTrap`.

**Projects:**
- **Animated Task List:** Add, remove, and reorder tasks with transitions and `flip`.
- **Modal with Actions:** A reusable modal that closes on outside click and traps focus.

**Try changing:** Replace a built-in transition with a custom CSS transition function.
```

- [ ] **Step 3: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-19-svelte-transitions
git commit -m "feat: add lecture 19 transitions overview and readme"
```

---

### Task 10: Lecture 19 Project 1 — Animated Task List

**Files:**
- Create: `src/routes/lecture-19-svelte-transitions/project-01-animated-task-list/+page.svelte`

- [ ] **Step 1: Write the page**

```svelte
<script lang="ts">
import { fly, fade } from 'svelte/transition';
import { flip } from 'svelte/animate';

type Task = { id: number; text: string };

let tasks = $state<Task[]>([
  { id: 1, text: 'Learn transitions' },
  { id: 2, text: 'Try animate:flip' },
]);

let newTask = $state('');

function addTask(event: Event) {
  event.preventDefault();
  if (newTask.trim() === '') return;
  tasks = [...tasks, { id: Date.now(), text: newTask.trim() }];
  newTask = '';
}

function removeTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
}

function shuffle() {
  tasks = tasks.slice().sort(() => Math.random() - 0.5);
}
</script>

<div class="card stack">
  <h2>Animated Task List</h2>

  <form class="row" onsubmit={addTask}>
    <input type="text" bind:value={newTask} placeholder="Add a task" />
    <button type="submit">Add</button>
    <button type="button" onclick={shuffle}>Shuffle</button>
  </form>

  <ul class="task-list">
    {#each tasks as task (task.id)}
      <li
        class="task"
        in:fly={{ y: 20, duration: 250 }}
        out:fade={{ duration: 200 }}
        animate:flip={{ duration: 250 }}
      >
        <span>{task.text}</span>
        <button onclick={() => removeTask(task.id)}>Remove</button>
      </li>
    {:else}
      <li class="empty">No tasks yet.</li>
    {/each}
  </ul>
</div>

<style>
  .row {
    gap: var(--space-sm);
    flex-wrap: wrap;
  }

  input {
    flex: 1;
    min-width: 12rem;
  }

  .task-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  .task button {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    cursor: pointer;
  }

  .empty {
    color: var(--color-text-muted);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-19-svelte-transitions/project-01-animated-task-list
git commit -m "feat: add lecture 19 project 1 animated task list"
```

---

### Task 11: Lecture 19 Project 2 — Modal with Actions

**Files:**
- Create: `src/routes/lecture-19-svelte-transitions/project-02-modal-actions/+page.svelte`
- Create: `src/routes/lecture-19-svelte-transitions/project-02-modal-actions/Modal.svelte`
- Create: `src/routes/lecture-19-svelte-transitions/project-02-modal-actions/actions.ts`

- [ ] **Step 1: Write custom actions**

```ts
import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
  const handleClick = (event: MouseEvent) => {
    if (node && !node.contains(event.target as Node)) {
      callback?.();
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
    update(newCallback) {
      callback = newCallback;
    },
  };
};

export const focusTrap: Action<HTMLElement> = (node) => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const focusable = node.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      last?.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === last) {
      first?.focus();
      event.preventDefault();
    }
  };

  node.addEventListener('keydown', handleKeydown);

  return {
    destroy() {
      node.removeEventListener('keydown', handleKeydown);
    },
  };
};
```

- [ ] **Step 2: Write Modal component**

```svelte
<script lang="ts">
import { fade, fly } from 'svelte/transition';
import { clickOutside, focusTrap } from './actions';

let { open = $bindable(false), title = 'Modal', children } = $props();
</script>

{#if open}
  <div class="backdrop" transition:fade={{ duration: 200 }}>
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      use:clickOutside={() => (open = false)}
      use:focusTrap
      transition:fly={{ y: -20, duration: 250 }}
    >
      <header class="modal-header">
        <h2 id="modal-title">{title}</h2>
        <button onclick={() => (open = false)} aria-label="Close">×</button>
      </header>
      <div class="modal-body">
        {@render children()}
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    padding: var(--space-md);
    z-index: 100;
  }

  .modal {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    max-width: 40ch;
    width: 100%;
    padding: var(--space-lg);
    box-shadow: var(--shadow);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: var(--space-md);
  }

  .modal-header h2 {
    margin: 0;
  }

  .modal-header button {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-text-muted);
  }
</style>
```

- [ ] **Step 3: Write page**

```svelte
<script lang="ts">
import Modal from './Modal.svelte';

let showModal = $state(false);
</script>

<div class="card stack">
  <h2>Modal with Actions</h2>
  <p>A reusable modal that closes on outside click and traps focus.</p>

  <button onclick={() => (showModal = true)}>Open modal</button>

  <Modal bind:open={showModal} title="Confirm">
    <p>This modal uses two custom actions:</p>
    <ul>
      <li><code>use:clickOutside</code> to close when clicking outside.</li>
      <li><code>use:focusTrap</code> to keep Tab inside the modal.</li>
    </ul>
    <button onclick={() => (showModal = false)}>Confirm</button>
  </Modal>
</div>
```

- [ ] **Step 4: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-19-svelte-transitions/project-02-modal-actions
git commit -m "feat: add lecture 19 project 2 modal with actions"
```

---

### Task 12: Lecture 20 capstone overview and README

**Files:**
- Create: `src/routes/lecture-20-module-3-capstone/+page.svelte`
- Create: `src/routes/lecture-20-module-3-capstone/README.md`
- Delete: `src/routes/lecture-20-svelte-composition/` placeholder

- [ ] **Step 1: Remove placeholder route**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git rm -r src/routes/lecture-20-svelte-composition
git commit -m "chore: remove old lecture 20 placeholder"
```

- [ ] **Step 2: Write overview page**

```svelte
<script lang="ts">
const features = [
  'Store-backed notes persisted to localStorage',
  'Lifecycle effects for storage sync',
  'Transitions when notes are added or removed',
  'Custom click-outside action',
  'Snippets for reusable UI pieces',
  'Context for selected-note state',
  'Special elements: head, window, dynamic element',
];
</script>

<div class="card stack">
  <h1>Module 3 Capstone: Markdown Notes</h1>

  <p>
    This workspace ties together every topic from Module 3. Notes live in a
    shared store, the UI uses transitions and actions, and composition tools keep
    the code organized.
  </p>

  <h2>Features</h2>
  <ul class="concept-list">
    {#each features as feature}
      <li>{feature}</li>
    {/each}
  </ul>

  <a class="project-link" href="/lecture-20-module-3-capstone/project">
    Open Notes Workspace
  </a>
</div>

<style>
  .concept-list {
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
  }

  .concept-list li {
    margin-block: var(--space-sm);
  }

  .project-link {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
    text-align: center;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .project-link:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }
</style>
```

- [ ] **Step 3: Write README**

```markdown
# Lecture 20 — Module 3 Capstone: Markdown Notes Workspace

**Goal:** Combine lifecycle, stores, transitions, actions, composition, context, and special elements in one app.

**Concepts covered:**
- Store-backed state with localStorage persistence.
- `$effect` for syncing state and listening to shortcuts.
- Transitions and `animate:flip` in a real list.
- Custom `use:clickOutside` action.
- Snippets for repeated UI.
- `setContext` / `getContext` for selected-note state.
- `<svelte:head>`, `<svelte:window>`, and `<svelte:element>`.

**Try changing:** Add a derived store that counts notes by tag, or add a word-count snippet.
```

- [ ] **Step 4: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-20-module-3-capstone
git commit -m "feat: add lecture 20 capstone overview and readme"
```

---

### Task 13: Lecture 20 shared modules

**Files:**
- Create: `src/routes/lecture-20-module-3-capstone/project/notes.ts`
- Create: `src/routes/lecture-20-module-3-capstone/project/markdown.ts`

- [ ] **Step 1: Write notes store**

```ts
import { writable } from 'svelte/store';

export type Note = {
  id: string;
  title: string;
  body: string;
  updatedAt: number;
};

const STORAGE_KEY = 'lecture-20-notes';

function loadNotes(): Note[] {
  if (typeof window === 'undefined') return getDefaultNotes();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultNotes();
    const parsed = JSON.parse(raw) as Note[];
    return parsed.length ? parsed : getDefaultNotes();
  } catch {
    return getDefaultNotes();
  }
}

function getDefaultNotes(): Note[] {
  return [
    {
      id: 'note-1',
      title: 'Welcome',
      body: '# Welcome\n\nThis is a **markdown** note.',
      updatedAt: Date.now(),
    },
  ];
}

function createNotesStore() {
  const { subscribe, set, update } = writable<Note[]>(loadNotes());

  return {
    subscribe,
    add(title: string) {
      const note: Note = {
        id: `note-${Date.now()}`,
        title: title || 'Untitled',
        body: '',
        updatedAt: Date.now(),
      };
      update((notes) => [note, ...notes]);
      return note.id;
    },
    updateNote(id: string, changes: Partial<Note>) {
      update((notes) =>
        notes.map((note) =>
          note.id === id ? { ...note, ...changes, updatedAt: Date.now() } : note,
        ),
      );
    },
    remove(id: string) {
      update((notes) => notes.filter((note) => note.id !== id));
    },
  };
}

export const notes = createNotesStore();

export function saveNotesToStorage(value: Note[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}
```

- [ ] **Step 2: Write minimal markdown helper**

```ts
export function renderMarkdown(text: string): string {
  return text
    .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
    .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n/g, '<br>');
}
```

- [ ] **Step 3: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-20-module-3-capstone/project/notes.ts
git add src/routes/lecture-20-module-3-capstone/project/markdown.ts
git commit -m "feat: add lecture 20 capstone shared modules"
```

---

### Task 14: Lecture 20 capstone components and page

**Files:**
- Create: `src/routes/lecture-20-module-3-capstone/project/NotesWorkspace.svelte`
- Create: `src/routes/lecture-20-module-3-capstone/project/NoteList.svelte`
- Create: `src/routes/lecture-20-module-3-capstone/project/NoteEditor.svelte`
- Create: `src/routes/lecture-20-module-3-capstone/project/Heading.svelte`
- Create: `src/routes/lecture-20-module-3-capstone/project/SearchBar.svelte`
- Create: `src/routes/lecture-20-module-3-capstone/project/Toolbar.svelte`
- Create: `src/routes/lecture-20-module-3-capstone/project/actions.ts`
- Create: `src/routes/lecture-20-module-3-capstone/project/+page.svelte`

- [ ] **Step 1: Write actions**

```ts
import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      callback?.();
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
    update(newCallback) {
      callback = newCallback;
    },
  };
};
```

- [ ] **Step 2: Write SearchBar**

```svelte
<script lang="ts">
let { query = $bindable('') } = $props();
</script>

<div class="search">
  <input
    type="search"
    placeholder="Search notes…"
    bind:value={query}
  />
</div>

<style>
  .search input {
    width: 100%;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-family: var(--font-body);
  }
</style>
```

- [ ] **Step 3: Write Toolbar**

```svelte
<script lang="ts">
let { onAdd, onDelete, canDelete } = $props<{ onAdd: () => void; onDelete: () => void; canDelete: boolean }>();
</script>

<div class="toolbar">
  <button onclick={onAdd}>New note</button>
  <button onclick={onDelete} disabled={!canDelete}>Delete</button>
</div>

<style>
  .toolbar {
    display: flex;
    gap: var(--space-sm);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

- [ ] **Step 4: Write NoteList**

```svelte
<script lang="ts">
import { getContext } from 'svelte';
import { fly } from 'svelte/transition';
import { notes, type Note } from './notes';
import type { Writable } from 'svelte/store';

let { searchQuery } = $props();
const selectedId = getContext<Writable<string | null>>('selectedId');

let filteredNotes = $derived(
  $notes
    .filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.updatedAt - a.updatedAt),
);
</script>

<ul class="note-list">
  {#each filteredNotes as note (note.id)}
    <li
      class="note-item"
      class:active={$selectedId === note.id}
      transition:fly={{ x: -10, duration: 200 }}
    >
      <button class="note-button" onclick={() => selectedId.set(note.id)}>
        <span class="note-title">{note.title || 'Untitled'}</span>
        <span class="note-date">{new Date(note.updatedAt).toLocaleDateString()}</span>
      </button>
    </li>
  {:else}
    <li class="empty">No notes found.</li>
  {/each}
</ul>

<style>
  .note-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .note-item {
    border-radius: var(--radius);
    overflow: hidden;
  }

  .note-item.active {
    background: var(--color-primary);
  }

  .note-button {
    width: 100%;
    text-align: start;
    padding: var(--space-md);
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .note-item.active .note-button {
    color: var(--color-primary-text);
  }

  .note-title {
    font-weight: 600;
  }

  .note-date {
    font-size: 0.75rem;
    opacity: 0.8;
  }

  .empty {
    color: var(--color-text-muted);
    padding: var(--space-md);
  }
</style>
```

- [ ] **Step 5: Write Heading component**

```svelte
<script lang="ts">
let { level = 1, children } = $props();
const tag = `h${Math.min(Math.max(level, 1), 6)}`;
</script>

<svelte:element this={tag}>
  {@render children()}
</svelte:element>
```

- [ ] **Step 6: Write NoteEditor**

```svelte
<script lang="ts">
import { notes, type Note } from './notes';
import { renderMarkdown } from './markdown';
import Heading from './Heading.svelte';

let { note } = $props<{ note: Note }>();

let showPreview = $state(false);

function updateTitle(event: Event) {
  const target = event.target as HTMLInputElement;
  notes.updateNote(note.id, { title: target.value });
}

function updateBody(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  notes.updateNote(note.id, { body: target.value });
}
</script>

<div class="editor">
  <input
    class="title-input"
    type="text"
    value={note.title}
    oninput={updateTitle}
    placeholder="Note title"
  />

  <div class="mode-toggle">
    <button onclick={() => (showPreview = false)} class:active={!showPreview}>Edit</button>
    <button onclick={() => (showPreview = true)} class:active={showPreview}>Preview</button>
  </div>

  {#if showPreview}
    <div class="preview">
      <Heading level={1}>{note.title || 'Untitled'}</Heading>
      {@html renderMarkdown(note.body)}
    </div>
  {:else}
    <textarea
      class="body-input"
      value={note.body}
      oninput={updateBody}
      placeholder="Write markdown here…"
    ></textarea>
  {/if}
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    height: 100%;
  }

  .title-input {
    font-size: 1.5rem;
    font-weight: 700;
    padding: var(--space-sm) 0;
    border: none;
    border-bottom: 1px solid var(--color-border);
    background: transparent;
    font-family: var(--font-heading);
  }

  .mode-toggle {
    display: flex;
    gap: var(--space-sm);
  }

  .mode-toggle button {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
  }

  .mode-toggle button.active {
    background: var(--color-primary);
    color: var(--color-primary-text);
    border-color: var(--color-primary);
  }

  .body-input {
    flex: 1;
    min-height: 12rem;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-family: var(--font-mono);
    resize: vertical;
  }

  .preview {
    flex: 1;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    overflow: auto;
  }

  .preview :global(h1),
  .preview :global(h2),
  .preview :global(h3) {
    margin-block: var(--space-md) var(--space-sm);
  }

  .preview :global(ul) {
    padding-inline-start: var(--space-lg);
  }
</style>
```

- [ ] **Step 7: Write NotesWorkspace**

```svelte
<script lang="ts">
import { setContext } from 'svelte';
import { writable } from 'svelte/store';
import { notes, saveNotesToStorage } from './notes';
import SearchBar from './SearchBar.svelte';
import Toolbar from './Toolbar.svelte';
import NoteList from './NoteList.svelte';
import NoteEditor from './NoteEditor.svelte';
import { clickOutside } from './actions';

let searchQuery = $state('');
let selectedId = writable<string | null>(null);
let showSearchPanel = $state(true);

setContext('selectedId', selectedId);

$effect(() => {
  const value = $notes;
  saveNotesToStorage(value);
});

let selectedNote = $derived($notes.find((note) => note.id === $selectedId));

function addNote() {
  const id = notes.add('New note');
  selectedId.set(id);
  searchQuery = '';
}

function deleteNote() {
  const current = $selectedId;
  if (!current) return;
  notes.remove(current);
  selectedId.set(null);
}

function handleKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    const input = document.querySelector('.search input') as HTMLInputElement | null;
    input?.focus();
    showSearchPanel = true;
  }
}
</script>

<svelte:head>
  <title>{selectedNote?.title ? `${selectedNote.title} — Notes` : 'Markdown Notes'}</title>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="workspace">
  <aside
    class="sidebar"
    class:closed={!showSearchPanel}
    use:clickOutside={() => {
      if (window.innerWidth < 640) showSearchPanel = false;
    }}
  >
    <Toolbar onAdd={addNote} onDelete={deleteNote} canDelete={!!$selectedId} />
    <SearchBar bind:query={searchQuery} />
    <NoteList searchQuery={searchQuery} />
  </aside>

  <main class="main">
    <button
      class="toggle-sidebar"
      onclick={() => (showSearchPanel = !showSearchPanel)}
      aria-label="Toggle sidebar"
    >
      ☰
    </button>

    {#if selectedNote}
      <NoteEditor note={selectedNote} />
    {:else}
      <div class="empty-state">
        <p>Select a note or create a new one.</p>
      </div>
    {/if}
  </main>
</div>

<style>
  .workspace {
    display: grid;
    grid-template-columns: 18rem 1fr;
    gap: var(--space-md);
    min-height: 70vh;
  }

  @media (max-width: 639px) {
    .workspace {
      grid-template-columns: 1fr;
      position: relative;
    }
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  @media (max-width: 639px) {
    .sidebar {
      position: absolute;
      inset: 0;
      z-index: 10;
      background: var(--color-bg);
    }

    .sidebar.closed {
      display: none;
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    min-width: 0;
  }

  .toggle-sidebar {
    align-self: flex-start;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
  }

  .empty-state {
    flex: 1;
    display: grid;
    place-items: center;
    color: var(--color-text-muted);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius);
  }
</style>
```

- [ ] **Step 8: Write project page**

```svelte
<script lang="ts">
import NotesWorkspace from './NotesWorkspace.svelte';
</script>

<div class="card">
  <NotesWorkspace />
</div>
```

- [ ] **Step 9: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add src/routes/lecture-20-module-3-capstone/project
git commit -m "feat: add lecture 20 markdown notes workspace"
```

---

### Task 15: Update SYLLABUS.md

**Files:**
- Modify: `SYLLABUS.md`

- [ ] **Step 1: Update lecture 20 line**

Change:

```markdown
20. Composition, context & special elements
```

To:

```markdown
20. Capstone: Markdown Notes Workspace
```

- [ ] **Step 2: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add SYLLABUS.md
git commit -m "docs: update syllabus lecture 20 title"
```

---

### Task 16: Final verification

- [ ] **Step 1: Run formatter, linter, type check, and build**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
export PATH="$PWD/.deno/bin:$PATH"
deno task format
deno task lint
deno task check
deno task build
```

Expected: all pass with zero errors.

- [ ] **Step 2: Spot-check routes in dev server**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
export PATH="$PWD/.deno/bin:$PATH"
deno task dev
```

Open `http://localhost:5173/` and verify:
- Lectures 17, 18, 19, 20 appear in the index.
- Each overview page links to its projects.
- Projects render and behave as designed.

- [ ] **Step 3: Commit any formatting fixes**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-3"
git add -A
git diff --cached --quiet || git commit -m "style: format and check module 3"
```

---

### Task 17: Merge back to main

- [ ] **Step 1: Merge and push**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte"
git checkout main
git pull
git merge module-3 --no-edit
export PATH="$PWD/.worktrees/module-3/.deno/bin:$PATH"
deno task format
deno task lint
deno task check
deno task build
git push
```

- [ ] **Step 2: Clean up worktree**

```bash
cd "/home/red/Classes/Web Apps with Svelte"
git worktree remove ".worktrees/module-3"
git worktree prune
git branch -d module-3
git push origin --delete module-3
```

---

## Self-review checklist

- **Spec coverage:**
  - Lecture 17 lifecycle with two projects → Tasks 3–5.
  - Lecture 18 stores with two projects → Tasks 6–8.
  - Lecture 19 transitions/actions with two projects → Tasks 9–11.
  - Lecture 20 capstone combining all topics → Tasks 12–14.
  - Course index and syllabus updates → Tasks 2, 15.
  - Verification and merge → Tasks 16–17.
- **Placeholder scan:** No TBD/TODO placeholders. Each step includes file paths and code.
- **Type consistency:** Store interfaces, Note type, and action signatures are consistent across tasks.
