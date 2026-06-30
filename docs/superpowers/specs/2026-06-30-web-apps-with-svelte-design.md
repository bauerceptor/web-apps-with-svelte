# Web Apps with Svelte — Course Design Spec

**Date:** 2026-06-30  
**Scope:** Full syllabus design + implementation of Module 1 (Svelte-flavored JS/TS basics).  
**Target audience:** Beginners who know HTML and CSS and are learning programming through Svelte.

---

## 1. Goal

Build a self-contained, beginner-first programming course that teaches modern web app development using Svelte. The course starts with programming fundamentals taught through Svelte-flavored JavaScript/TypeScript, moves through Svelte 5 fundamentals, and ends with a realistic AI-powered app using the Groq API.

The repo is a runnable SvelteKit project. Each lecture is a route with runnable project sub-routes. Instructors can teach each concept first in the Svelte playground, then point students to the same code living in the repo.

---

## 2. Repository structure

```
web-apps-with-svelte/
├── README.md
├── SYLLABUS.md
├── deno.json                 # Deno tasks and imports
├── vite.config.ts            # Vite configuration (required by SvelteKit)
├── biome.json                # Biome formatter/linter config
├── src/
│   ├── app.html
│   ├── app.d.ts
│   ├── lib/
│   │   ├── styles/
│   │   │   ├── reset.css
│   │   │   ├── theme.css     # CSS custom properties
│   │   │   └── utils.css     # shared utility classes
│   │   └── utils/            # shared TS helpers
│   └── routes/
│       ├── +page.svelte      # course index / table of contents
│       ├── +layout.svelte    # navigation + global styles
│       ├── lecture-01-io/
│       │   ├── +page.svelte
│       │   ├── project-01-greeter/
│       │   │   └── +page.svelte
│       │   ├── project-02-tip-calculator/
│       │   │   └── +page.svelte
│       │   └── README.md
│       ├── lecture-02-types-and-operators/
│       │   └── ...
│       ...
│       └── lecture-10-capstone/
│           └── +page.svelte
├── docs/superpowers/specs/
│   └── 2026-06-30-web-apps-with-svelte-design.md
└── static/
    └── favicon.png
```

### File conventions

- Each lecture owns one folder under `src/routes/lecture-NN-slug/`.
- The lecture overview page (`+page.svelte`) shows the topic and links to each project.
- Each project is a sub-route with its own `+page.svelte`.
- `README.md` in each lecture folder contains: goal, concepts covered, project list, and one "try changing this" prompt.
- Shared styles live in `src/lib/styles/` and are imported in `+layout.svelte`.

---

## 3. Toolchain

The toolchain uses modern tools that students can run with minimal setup. Vite is included because SvelteKit is built on it; the README explains this honestly.

| Tool | Role | Why it is in the course |
|------|------|--------------------------|
| **Deno** | Runtime and package manager | Replaces Node + npm. Deno runs TypeScript natively, handles dependencies, and runs the task scripts defined in `deno.json`. |
| **Vite** | Dev server and bundler | Required by SvelteKit. Starts the dev server and bundles the app for production. |
| **SvelteKit** | App framework | Provides file-based routing, layouts, and the project structure that mirrors real-world Svelte apps. |
| **Biome** | Formatter and linter | One tool that formats and lints TS/JS/Svelte. Used with `deno task check` and `deno task format`. |
| **Lightning CSS** | CSS transformer | Handles modern CSS features such as nesting, custom properties, and minification as part of the Vite build pipeline. |

### Commands

- `deno task dev` — start the Vite dev server.
- `deno task build` — build for production.
- `deno task check` — type-check, lint, and format-check.
- `deno task format` — format all files.

---

## 4. Syllabus

| Module | Topics | Status in first pass |
|--------|--------|----------------------|
| **Module 1: Svelte-flavored JS/TS** | Variables, I/O, types, operators, comparisons, booleans, if/else, loops, functions, events, arrays, objects, capstone | Fully implemented |
| **Module 2: Svelte 5 fundamentals** | Runes, reactivity, props, logic blocks, events, bindings | Skeleton routes + READMEs |
| **Module 3: Svelte beyond components** | Lifecycle, stores, special elements, transitions, actions, classes/styles, composition | Skeleton routes + READMEs |
| **Module 4: AI-driven apps** | Groq API, async/await, loading/error states, recipe generator | Skeleton routes + READMEs |

The full lecture list lives in `SYLLABUS.md`. Only Module 1 is implemented in this pass.

---

## 5. Module 1 detailed breakdown

Each lecture has:

- one `README.md`
- one overview `+page.svelte`
- 2–3 project sub-routes

All projects use only the concepts introduced up to that lecture.

| Lecture | Concepts | Example projects |
|---------|----------|------------------|
| **01 — Input / Output & Variables** | `let`, reassignment, `{ }` templating, basic bindings | Greeter, Tip Calculator, Console-style logger |
| **02 — Numbers, Strings & Operators** | types, arithmetic, template strings, `Number()` | Calculator, Temperature converter, BMI calculator |
| **03 — Comparisons & Booleans** | `===`, `!==`, `<`, `>`, `&&`, `\|\|`, `!` | Number guesser, Login gate, Eligibility checker |
| **04 — If / Else** | `{#if}`, `{:else if}`, `{:else}` | Grade calculator, Quiz feedback, Theme toggler |
| **05 — Loops** | `{#each}`, arrays of primitives | Multiplication table, Simple todo list, Countdown |
| **06 — Functions** | `function`, parameters, return values | Utility converters, Random quote, Score keeper |
| **07 — Events** | `onclick`, `oninput`, event handlers | Counter, Keyboard demo, Form handler |
| **08 — Arrays** | create, `.push`, `.filter`, `.map`, `.find` | Grocery list, Random picker, Leaderboard |
| **09 — Objects** | object literals, property access, arrays of objects | Profile card, Product card, Quiz data model |
| **10 — Capstone** | All Module 1 concepts combined | Flashcard quiz app |

### Capstone constraints

- Must use variables, I/O, types/operators, comparisons, if/else, loops, functions, events, arrays, and objects.
- Must be a realistic-feeling mini-app.
- Must not require concepts from Modules 2–4.
- Should be challenging enough to take a full session, but solvable with the Module 1 toolkit.

---

## 6. Modern CSS integration

CSS is taught incrementally. Each lecture introduces one modern CSS feature and uses it in that lecture's projects. Earlier features remain available in later lectures.

| Lecture | CSS topic | How it is used |
|---------|-----------|----------------|
| 01 | CSS custom properties | Centralized color/spacing theme in `theme.css` |
| 02 | `calc()` and logical properties | Fluid spacing with `margin-inline`, `padding-block` |
| 03 | Flexbox | Aligning controls and cards |
| 04 | Conditional classes + custom properties | Light/dark theme toggler |
| 05 | CSS Grid | Multiplication table and list layouts |
| 06 | `clamp()`, `min()`, `max()` | Responsive type and spacing without media queries |
| 07 | `:has()` | Parent-level styling based on child state, e.g., a form group that knows it contains an error |
| 08 | Styling lists | `gap`, `::marker`, `:nth-child()` for leaderboards and grocery lists |
| 09 | Native CSS nesting | Cleaner component-scoped styles in `.svelte` files |
| 10 | Container queries + combination | Responsive card layout that adapts to its container, not just the viewport |

No Tailwind. Students learn native CSS that handles the same problems.

---

## 7. Module 2–3 overview (Svelte 5)

Modules 2 and 3 are documented in `SYLLABUS.md` and represented by skeleton routes in the first pass. When implemented, each topic follows the same pattern as Module 1: brief README, overview page, and 2–3 project routes.

### Module 2: Svelte 5 fundamentals

- Runes: `$state`, `$derived`, `$effect`, `$props`, `$bindable`
- Reactivity nuances: deep reactivity, immutable updates, reassignment for arrays/objects
- Props: passing data down, `$props()`, default values
- Logic blocks: `{#if}`, `{#each}`, keyed `{#each}`, `{#await}`
- Events: DOM events, event modifiers, component events
- Bindings: `bind:value`, `bind:checked`, `bind:this`

### Module 3: Svelte beyond components

- Lifecycle: `$effect`, `$effect.pre`, cleanup functions
- Stores: writable, readable, derived; when stores still matter alongside runes
- Special elements: `<svelte:head>`, `<svelte:window>`, `<svelte:element>`
- Transitions and animations: `transition:`, `animate:`, `crossfade`
- Actions: `use:action`, parameters, cleanup
- Classes and styles: `class:`, style directives, CSS custom properties
- Component composition: slots, snippets (`{#snippet}`), render tags
- Modules: `<script module>`, context API

These modules also include nuances often skipped by the official Svelte tutorial, such as:

- Why keyed `{#each}` blocks matter for stateful list items.
- The difference between `$:` (Svelte 4) and `$effect` / `$derived` (Svelte 5).
- When to use `$derived` versus a plain `$state` update.
- Common reactivity gotchas with objects and arrays.

---

## 8. Module 4 overview (AI-driven apps)

The final module builds a **Smart Recipe Generator**.

### Features

- Form for ingredients, dietary preferences, and serving size.
- Calls the Groq chat completions API.
- Parses and displays a structured recipe: title, ingredients list, steps.
- Handles loading, error, and empty states explicitly.
- Optional stretch goal: save favorite recipes to `localStorage`.

### Concepts taught

- `async/await`
- `fetch` with headers and JSON bodies
- Environment variables for API keys
- Prompt design for structured output
- UI state machines: idle / loading / success / error
- Optional: streaming responses

---

## 9. Content style guide

- **READMEs are short.** Each contains: goal, concepts covered, project list, one "try changing this" prompt.
- **Comments explain why, not what.** Avoid restating the syntax.
- **No emojis, no filler text, no AI-generated intros.** Keep prose minimal and relevant.
- **TypeScript reads like JS.** Use light annotations: `let count: number = 0`, typed function parameters, simple return types. No generics, no complex interfaces, no advanced type tricks.
- **Projects are runnable.** Every `+page.svelte` renders in the browser without extra setup.
- **Playground mapping.** Where helpful, a comment links the project back to the smallest playground version of the same idea.

---

## 10. Teaching flow

1. Introduce the new programming concept in the Svelte playground with the smallest possible snippet.
2. Show the same concept inside the corresponding repo route.
3. Walk through the first project together.
4. Students run the project and modify the commented `// TODO:` sections in the remaining projects.
5. Review the CSS feature introduced that day and how it supports the UI.
6. End the lecture with the capstone in the final session.

---

## 11. Decisions made

- **Course packaging:** Runnable SvelteKit template + lecture folders.
- **First pass scope:** Design full syllabus; implement Module 1 only.
- **Module 1 content:** Lectures 01–09 + capstone, each with 2–3 projects.
- **File organization:** One route per lecture, sub-routes per project/example.
- **TypeScript style:** Light type hints only, like JS with annotations.
- **Toolchain:** Deno + Vite + SvelteKit + Biome + Lightning CSS.
- **Svelte version:** Svelte 5 with runes.
- **AI project:** Smart recipe generator using the Groq API.
- **Explanations:** Brief README per lecture + heavily commented code.

---

## 12. Open questions for future passes

- Exact project list and prompts for Modules 2–4.
- Whether to add tests or automated checks for student projects.
- Whether to provide solution branches or keep solutions inline behind comments.
- Whether to include a deployment guide for the final AI app.
