# Module 1: Svelte-Flavored JS/TS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a runnable SvelteKit project containing the first module of the course: programming basics (variables through objects) taught through Svelte-flavored TypeScript, with 2 projects per lecture and one capstone.

**Architecture:** A SvelteKit app using Vite (required by SvelteKit), Deno for runtime/package management, Biome for formatting/linting, and Lightning CSS for CSS processing. Each lecture is a route with sub-routes for projects. Shared styles live in `src/lib/styles/`. The course index is at `/`.

**Tech Stack:** Deno, Vite, SvelteKit, Svelte 5, TypeScript (light annotations), Biome, Lightning CSS.

---

## File map

| File | Responsibility |
|------|----------------|
| `deno.json` | Deno imports and task scripts |
| `svelte.config.js` | SvelteKit configuration |
| `vite.config.ts` | Vite + Lightning CSS configuration |
| `tsconfig.json` | TypeScript settings |
| `biome.json` | Formatter and linter rules |
| `src/app.html` | HTML app shell |
| `src/app.d.ts` | SvelteKit ambient types |
| `src/lib/styles/reset.css` | Minimal CSS reset |
| `src/lib/styles/theme.css` | CSS custom properties |
| `src/lib/styles/utils.css` | Shared utility classes |
| `src/routes/+layout.svelte` | Navigation + global style imports |
| `src/routes/+page.svelte` | Course index |
| `src/routes/lecture-NN-*/+page.svelte` | Lecture overview |
| `src/routes/lecture-NN-*/project-*/+page.svelte` | Individual projects |
| `src/routes/lecture-NN-*/README.md` | Lecture notes |
| `README.md` | Repo introduction and tooling guide |
| `SYLLABUS.md` | Full course syllabus |

---

### Task 1: Scaffold the SvelteKit project

**Files:**
- Create: `deno.json`
- Create: `svelte.config.js`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `biome.json`
- Create: `src/app.html`
- Create: `src/app.d.ts`
- Create: `static/favicon.svg`

- [ ] **Step 1: Create `deno.json`**

```json
{
  "imports": {
    "@biomejs/biome": "npm:@biomejs/biome@^1.9.4",
    "@sveltejs/adapter-auto": "npm:@sveltejs/adapter-auto@^3.0.0",
    "@sveltejs/kit": "npm:@sveltejs/kit@^2.0.0",
    "@sveltejs/vite-plugin-svelte": "npm:@sveltejs/vite-plugin-svelte@^4.0.0",
    "browserslist": "npm:browserslist@^4.0.0",
    "lightningcss": "npm:lightningcss@^1.0.0",
    "svelte": "npm:svelte@^5.0.0",
    "svelte-check": "npm:svelte-check@^4.0.0",
    "typescript": "npm:typescript@^5.0.0",
    "vite": "npm:vite@^5.0.0"
  },
  "tasks": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "format": "biome format --write .",
    "lint": "biome lint ."
  }
}
```

- [ ] **Step 2: Create `svelte.config.js`**

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter()
  }
};

export default config;
```

- [ ] **Step 3: Create `vite.config.ts`**

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    }
  }
});
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": false,
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 5: Create `biome.json`**

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noConsoleLog": "off"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single"
    }
  }
}
```

- [ ] **Step 6: Create `src/app.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.svg" type="image/svg+xml" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 7: Create `src/app.d.ts`**

```ts
/// <reference types="@sveltejs/kit" />

declare global {
  namespace App {}
}

export {};
```

- [ ] **Step 8: Copy the provided SVG favicon**

Run:

```bash
mkdir -p static
cp /home/red/Downloads/svelte-svgrepo-com.svg static/favicon.svg
```

Expected result: `static/favicon.svg` exists and is the SVG from the Downloads folder.

- [ ] **Step 9: Commit**

```bash
git add deno.json svelte.config.js vite.config.ts tsconfig.json biome.json src/app.html src/app.d.ts static/favicon.svg
git commit -m "chore: scaffold SvelteKit project with Deno, Vite, Biome, Lightning CSS"
```

---

### Task 2: Shared styles, layout, and course index

**Files:**
- Create: `src/lib/styles/reset.css`
- Create: `src/lib/styles/theme.css`
- Create: `src/lib/styles/utils.css`
- Create: `src/routes/+layout.svelte`
- Create: `src/routes/+page.svelte`

- [ ] **Step 1: Create `src/lib/styles/reset.css`**

```css
/* A minimal reset: remove default spacing and use border-box everywhere. */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
```

- [ ] **Step 2: Create `src/lib/styles/theme.css`**

```css
/* Load a curated set of modern open-source fonts from Google Fonts. */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

/* CSS custom properties (variables) used across the whole course. */
:root {
  --color-bg: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #111111;
  --color-text-muted: #666666;
  --color-primary: #2563eb;
  --color-primary-text: #ffffff;
  --color-border: #d1d5db;
  --color-error: #dc2626;
  --color-success: #16a34a;

  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 3rem;

  --radius: 0.5rem;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  --font-body: 'Inter', system-ui, sans-serif;
  --font-heading: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'Space Mono', monospace;
  --font-accent: 'Playfair Display', serif;

  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-bg);
}

h1,
h2,
h3 {
  font-family: var(--font-heading);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0a0a0a;
    --color-surface: #171717;
    --color-text: #f5f5f5;
    --color-text-muted: #a3a3a3;
    --color-primary: #3b82f6;
    --color-border: #404040;
  }
}
```

- [ ] **Step 3: Create `src/lib/styles/utils.css`**

```css
/* Small reusable utility classes. */
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.card {
  padding: var(--space-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

input,
button {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-bg);
  color: var(--color-text);
}

button {
  cursor: pointer;
  background: var(--color-primary);
  color: var(--color-primary-text);
  border-color: var(--color-primary);
}

button:hover {
  filter: brightness(1.1);
}
```

- [ ] **Step 4: Create `src/routes/+layout.svelte`**

```svelte
<script lang="ts">
  import '$lib/styles/reset.css';
  import '$lib/styles/theme.css';
  import '$lib/styles/utils.css';

  let { children } = $props();
</script>

<nav class="nav">
  <a class="nav-link" href="/">Web Apps with Svelte</a>
</nav>

<div class="container">
  {@render children()}
</div>

<style>
  .nav {
    padding: var(--space-md);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  .nav-link {
    color: var(--color-text);
    text-decoration: none;
    font-weight: 600;
  }

  .container {
    max-width: 70ch;
    margin-inline: auto;
    padding: var(--space-xl) var(--space-md);
  }
</style>
```

- [ ] **Step 5: Create `src/routes/+page.svelte`**

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
    { num: 10, slug: 'lecture-10-capstone', title: 'Capstone: Flashcard Quiz' }
  ];
</script>

<h1>Web Apps with Svelte</h1>
<p class="intro">A beginner-first course that teaches programming basics through Svelte.</p>

<ol class="lecture-list">
  {#each lectures as lecture}
    <li>
      <a href="/{lecture.slug}">
        <span class="number">{lecture.num}</span>
        {lecture.title}
      </a>
    </li>
  {/each}
</ol>

<style>
  .intro {
    color: var(--color-text-muted);
    margin-block: var(--space-sm) var(--space-lg);
  }

  .lecture-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .lecture-list li a {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .lecture-list li a:hover {
    border-color: var(--color-primary);
  }

  .number {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    background: var(--color-primary);
    color: var(--color-primary-text);
    border-radius: 50%;
    font-weight: 700;
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 6: Verify the dev server starts**

Run:

```bash
deno task dev &
sleep 5
curl -s http://localhost:5173/ | head -n 20
```

Expected: HTML containing "Web Apps with Svelte" is returned.

Stop the server:

```bash
kill %1
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/styles src/routes/+layout.svelte src/routes/+page.svelte
git commit -m "feat: add shared styles, layout, and course index"
```

---

### Task 3: Lecture 01 — Input / Output & Variables

**Files:**
- Create: `src/routes/lecture-01-io/README.md`
- Create: `src/routes/lecture-01-io/+page.svelte`
- Create: `src/routes/lecture-01-io/project-01-greeter/+page.svelte`
- Create: `src/routes/lecture-01-io/project-02-tip-calculator/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-01-io/README.md`**

```markdown
# Lecture 01 — Input / Output & Variables

**Goal:** Store values in variables and show them in the page.

**Concepts:**
- `let` declares a variable.
- `{ }` displays a variable in the HTML.
- `bind:value` connects an input to a variable.

**Projects:**
1. Greeter — type a name and see a greeting update live.
2. Tip Calculator — enter a bill and tip percent to see the total.

**Try changing:** Update the greeting to include the current time.
```

- [ ] **Step 2: Create `src/routes/lecture-01-io/+page.svelte`**

```svelte
<script lang="ts">
  const projects = [
    { slug: 'project-01-greeter', title: 'Greeter' },
    { slug: 'project-02-tip-calculator', title: 'Tip Calculator' }
  ];
</script>

<h1>Lecture 01 — Input / Output & Variables</h1>
<p>This lecture introduces variables and the simplest form of input and output.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-01-io/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
```

- [ ] **Step 3: Create `src/routes/lecture-01-io/project-01-greeter/+page.svelte`**

```svelte
<script lang="ts">
  // A variable that holds the user's name. $state makes it reactive.
  let name = $state('');
</script>

<div class="card stack">
  <h2>Greeter</h2>

  <label class="row">
    Your name:
    <input type="text" bind:value={name} placeholder="Type your name" />
  </label>

  <!-- Output changes automatically when name changes. -->
  <p class="greeting">
    {#if name}
      Hello, {name}!
    {:else}
      Hello, stranger!
    {/if}
  </p>

  <button onclick={() => (name = '')}>Clear</button>
</div>

<style>
  .greeting {
    font-size: 1.25rem;
    color: var(--color-primary);
  }
</style>
```

- [ ] **Step 4: Create `src/routes/lecture-01-io/project-02-tip-calculator/+page.svelte`**

```svelte
<script lang="ts">
  // Variables for the bill amount and tip percentage.
  let bill = $state(0);
  let tipPercent = $state(15);

  // Calculate total whenever the inputs change.
  let tipAmount = $derived((bill * tipPercent) / 100);
  let total = $derived(bill + tipAmount);
</script>

<div class="card stack">
  <h2>Tip Calculator</h2>

  <label class="row">
    Bill amount:
    <input type="number" bind:value={bill} min="0" step="0.01" />
  </label>

  <label class="row">
    Tip percentage:
    <input type="number" bind:value={tipPercent} min="0" max="100" />
  </label>

  <div class="result">
    <p>Tip: ${tipAmount.toFixed(2)}</p>
    <p>Total: ${total.toFixed(2)}</p>
  </div>
</div>

<style>
  .result {
    padding: var(--space-md);
    background: var(--color-surface);
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
  }

  .result p {
    font-size: 1.125rem;
    margin-block: var(--space-xs);
  }
</style>
```

- [ ] **Step 5: Verify the lecture route renders**

Run:

```bash
deno task dev &
sleep 5
curl -s http://localhost:5173/lecture-01-io | grep -o 'Input / Output'
```

Expected: "Input / Output" appears in the output.

Stop the server:

```bash
kill %1
```

- [ ] **Step 6: Commit**

```bash
git add src/routes/lecture-01-io
git commit -m "feat: add lecture 01 - input/output and variables"
```

---

### Task 4: Lecture 02 — Numbers, Strings & Operators

**Files:**
- Create: `src/routes/lecture-02-types-and-operators/README.md`
- Create: `src/routes/lecture-02-types-and-operators/+page.svelte`
- Create: `src/routes/lecture-02-types-and-operators/project-01-temperature-converter/+page.svelte`
- Create: `src/routes/lecture-02-types-and-operators/project-02-bmi-calculator/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-02-types-and-operators/README.md`**

```markdown
# Lecture 02 — Numbers, Strings & Operators

**Goal:** Work with numbers and strings, and use arithmetic operators.

**Concepts:**
- `number` and `string` types.
- Arithmetic: `+`, `-`, `*`, `/`.
- Template strings with backticks.
- Converting strings to numbers with `Number()`.

**Projects:**
1. Temperature Converter — convert Celsius and Fahrenheit.
2. BMI Calculator — compute a body-mass index from height and weight.

**Try changing:** Add Kelvin conversion to the first project.
```

- [ ] **Step 2: Create `src/routes/lecture-02-types-and-operators/+page.svelte`**

```svelte
<script lang="ts">
  const projects = [
    { slug: 'project-01-temperature-converter', title: 'Temperature Converter' },
    { slug: 'project-02-bmi-calculator', title: 'BMI Calculator' }
  ];
</script>

<h1>Lecture 02 — Numbers, Strings & Operators</h1>
<p>Numbers, strings, arithmetic, and type conversion.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-02-types-and-operators/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
```

- [ ] **Step 3: Create `src/routes/lecture-02-types-and-operators/project-01-temperature-converter/+page.svelte`**

```svelte
<script lang="ts">
  // Start with a comfortable room temperature.
  let celsius = $state(20);

  // Derive Fahrenheit from the current Celsius value.
  let fahrenheit = $derived((celsius * 9) / 5 + 32);

  // Template strings let us embed values inside readable text.
  let summary = $derived(`${celsius}°C is ${fahrenheit.toFixed(1)}°F`);
</script>

<div class="card stack">
  <h2>Temperature Converter</h2>

  <label class="row">
    Celsius:
    <input type="number" bind:value={celsius} />
  </label>

  <p class="result">{summary}</p>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .result {
    font-family: var(--font-mono);
    font-size: 1.125rem;
    color: var(--color-primary);
  }
</style>
```

- [ ] **Step 4: Create `src/routes/lecture-02-types-and-operators/project-02-bmi-calculator/+page.svelte`**

```svelte
<script lang="ts">
  let heightCm = $state(170);
  let weightKg = $state(70);

  // Convert height to meters before using it in the formula.
  let bmi = $derived(weightKg / Math.pow(heightCm / 100, 2));

  function category(value: number): string {
    if (value < 18.5) return 'Underweight';
    if (value < 25) return 'Healthy weight';
    if (value < 30) return 'Overweight';
    return 'Obese';
  }
</script>

<div class="card stack">
  <h2>BMI Calculator</h2>

  <label class="row">
    Height (cm):
    <input type="number" bind:value={heightCm} min="1" />
  </label>

  <label class="row">
    Weight (kg):
    <input type="number" bind:value={weightKg} min="1" />
  </label>

  <div class="result">
    <p>BMI: {bmi.toFixed(1)}</p>
    <p>Category: {category(bmi)}</p>
  </div>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .result p {
    font-size: 1.125rem;
    margin-block: var(--space-xs);
  }

  .result p:last-child {
    color: var(--color-primary);
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/routes/lecture-02-types-and-operators
git commit -m "feat: add lecture 02 - numbers, strings and operators"
```

---

### Task 5: Lecture 03 — Comparisons & Booleans

**Files:**
- Create: `src/routes/lecture-03-comparisons-and-booleans/README.md`
- Create: `src/routes/lecture-03-comparisons-and-booleans/+page.svelte`
- Create: `src/routes/lecture-03-comparisons-and-booleans/project-01-number-guesser/+page.svelte`
- Create: `src/routes/lecture-03-comparisons-and-booleans/project-02-login-gate/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-03-comparisons-and-booleans/README.md`**

```markdown
# Lecture 03 — Comparisons & Booleans

**Goal:** Compare values and combine boolean conditions.

**Concepts:**
- Comparison operators: `===`, `!==`, `<`, `>`, `<=`, `>=`.
- Boolean type: `true` / `false`.
- Logical operators: `&&`, `||`, `!`.

**Projects:**
1. Number Guesser — compare a guess to a secret number.
2. Login Gate — check username and password with `&&`.

**Try changing:** Allow a limited number of guesses in the first project.
```

- [ ] **Step 2: Create `src/routes/lecture-03-comparisons-and-booleans/+page.svelte`**

```svelte
<script lang="ts">
  const projects = [
    { slug: 'project-01-number-guesser', title: 'Number Guesser' },
    { slug: 'project-02-login-gate', title: 'Login Gate' }
  ];
</script>

<h1>Lecture 03 — Comparisons & Booleans</h1>
<p>Comparisons, booleans, and logical operators.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-03-comparisons-and-booleans/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
```

- [ ] **Step 3: Create `src/routes/lecture-03-comparisons-and-booleans/project-01-number-guesser/+page.svelte`**

```svelte
<script lang="ts">
  // Pick a secret number between 1 and 100.
  let secret = $state(Math.floor(Math.random() * 100) + 1);
  let guess = $state(50);
  let message = $state('Make a guess!');

  function check() {
    if (guess === secret) {
      message = 'Correct!';
    } else if (guess < secret) {
      message = 'Too low.';
    } else {
      message = 'Too high.';
    }
  }

  function reset() {
    secret = Math.floor(Math.random() * 100) + 1;
    guess = 50;
    message = 'Make a guess!';
  }
</script>

<div class="card stack">
  <h2>Number Guesser</h2>

  <label class="row">
    Your guess:
    <input type="number" bind:value={guess} min="1" max="100" />
  </label>

  <div class="row">
    <button onclick={check}>Check</button>
    <button onclick={reset}>New number</button>
  </div>

  <p class="message" class:correct={message === 'Correct!'}>{message}</p>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .message {
    font-weight: 700;
    color: var(--color-error);
  }

  .message.correct {
    color: var(--color-success);
  }
</style>
```

- [ ] **Step 4: Create `src/routes/lecture-03-comparisons-and-booleans/project-02-login-gate/+page.svelte`**

```svelte
<script lang="ts">
  let username = $state('');
  let password = $state('');

  // Both conditions must be true for access to be granted.
  let isValid = $derived(username === 'student' && password === 'svelte');
</script>

<div class="card stack">
  <h2>Login Gate</h2>

  <label class="row">
    Username:
    <input type="text" bind:value={username} />
  </label>

  <label class="row">
    Password:
    <input type="password" bind:value={password} />
  </label>

  <p class="status" class:valid={isValid}>
    {isValid ? 'Access granted' : 'Access denied'}
  </p>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .status {
    font-weight: 700;
    color: var(--color-error);
  }

  .status.valid {
    color: var(--color-success);
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/routes/lecture-03-comparisons-and-booleans
git commit -m "feat: add lecture 03 - comparisons and booleans"
```

---

### Task 6: Lecture 04 — If / Else

**Files:**
- Create: `src/routes/lecture-04-if-else/README.md`
- Create: `src/routes/lecture-04-if-else/+page.svelte`
- Create: `src/routes/lecture-04-if-else/project-01-grade-calculator/+page.svelte`
- Create: `src/routes/lecture-04-if-else/project-02-discount-eligibility/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-04-if-else/README.md`**

```markdown
# Lecture 04 — If / Else

**Goal:** Branch the UI based on conditions.

**Concepts:**
- `{#if}`, `{:else if}`, and `{:else}` blocks in Svelte.
- Mapping numeric ranges to categories.
- Conditional CSS classes.

**Projects:**
1. Grade Calculator — turn a percentage into a letter grade.
2. Discount Eligibility — show different discounts based on cart total.

**Try changing:** Add a plus/minus modifier to the grade.
```

- [ ] **Step 2: Create `src/routes/lecture-04-if-else/+page.svelte`**

```svelte
<script lang="ts">
  const projects = [
    { slug: 'project-01-grade-calculator', title: 'Grade Calculator' },
    { slug: 'project-02-discount-eligibility', title: 'Discount Eligibility' }
  ];
</script>

<h1>Lecture 04 — If / Else</h1>
<p>Branching logic and conditional rendering.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-04-if-else/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
```

- [ ] **Step 3: Create `src/routes/lecture-04-if-else/project-01-grade-calculator/+page.svelte`**

```svelte
<script lang="ts">
  let score = $state(85);

  function grade(value: number): string {
    if (value >= 90) return 'A';
    if (value >= 80) return 'B';
    if (value >= 70) return 'C';
    if (value >= 60) return 'D';
    return 'F';
  }
</script>

<div class="card stack">
  <h2>Grade Calculator</h2>

  <label class="row">
    Score:
    <input type="number" bind:value={score} min="0" max="100" />
  </label>

  <p class="grade">Grade: {grade(score)}</p>

  {#if score >= 60}
    <p class="pass">You passed.</p>
  {:else}
    <p class="fail">You did not pass.</p>
  {/if}
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .grade {
    font-size: 1.5rem;
    font-family: var(--font-mono);
  }

  .pass {
    color: var(--color-success);
  }

  .fail {
    color: var(--color-error);
  }
</style>
```

- [ ] **Step 4: Create `src/routes/lecture-04-if-else/project-02-discount-eligibility/+page.svelte`**

```svelte
<script lang="ts">
  let total = $state(75);

  // Discount percentage based on cart total.
  let discount = $derived(total >= 100 ? 20 : total >= 50 ? 10 : 0);
  let final = $derived(total - (total * discount) / 100);
</script>

<div class="card stack">
  <h2>Discount Eligibility</h2>

  <label class="row">
    Cart total:
    <input type="number" bind:value={total} min="0" />
  </label>

  {#if discount > 0}
    <p class="discount">You qualify for {discount}% off.</p>
    <p class="final">Final total: ${final.toFixed(2)}</p>
  {:else}
    <p class="no-discount">Add ${(50 - total).toFixed(2)} more for 10% off.</p>
  {/if}
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .discount {
    color: var(--color-success);
    font-weight: 700;
  }

  .final {
    font-size: 1.25rem;
  }

  .no-discount {
    color: var(--color-text-muted);
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/routes/lecture-04-if-else
git commit -m "feat: add lecture 04 - if/else"
```

---

### Task 7: Lecture 05 — Loops

**Files:**
- Create: `src/routes/lecture-05-loops/README.md`
- Create: `src/routes/lecture-05-loops/+page.svelte`
- Create: `src/routes/lecture-05-loops/project-01-multiplication-table/+page.svelte`
- Create: `src/routes/lecture-05-loops/project-02-todo-list/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-05-loops/README.md`**

```markdown
# Lecture 05 — Loops

**Goal:** Render lists of data using loops.

**Concepts:**
- `{#each}` blocks in Svelte.
- Creating arrays of numbers with a loop helper.
- Adding and removing items from an array.

**Projects:**
1. Multiplication Table — generate rows from a single number.
2. Todo List — add, complete, and remove tasks.

**Try changing:** Reverse the order of the multiplication table.
```

- [ ] **Step 2: Create `src/routes/lecture-05-loops/+page.svelte`**

```svelte
<script lang="ts">
  const projects = [
    { slug: 'project-01-multiplication-table', title: 'Multiplication Table' },
    { slug: 'project-02-todo-list', title: 'Todo List' }
  ];
</script>

<h1>Lecture 05 — Loops</h1>
<p>Rendering lists with `{#each}`.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-05-loops/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
```

- [ ] **Step 3: Create `src/routes/lecture-05-loops/project-01-multiplication-table/+page.svelte`**

```svelte
<script lang="ts">
  let number = $state(5);

  // Create an array [1, 2, 3, ..., 10] to drive the loop.
  let multipliers = $derived([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
</script>

<div class="card stack">
  <h2>Multiplication Table</h2>

  <label class="row">
    Number:
    <input type="number" bind:value={number} />
  </label>

  <ul class="table">
    {#each multipliers as m}
      <li>{number} × {m} = {number * m}</li>
    {/each}
  </ul>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .table {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12ch, 1fr));
    gap: var(--space-sm);
  }

  .table li {
    padding: var(--space-sm);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-align: center;
    font-family: var(--font-mono);
  }
</style>
```

- [ ] **Step 4: Create `src/routes/lecture-05-loops/project-02-todo-list/+page.svelte`**

```svelte
<script lang="ts">
  let newTask = $state('');
  let tasks = $state<string[]>(['Learn Svelte', 'Build a project']);

  function add() {
    if (newTask.trim() !== '') {
      tasks = [...tasks, newTask.trim()];
      newTask = '';
    }
  }

  function remove(index: number) {
    tasks = tasks.filter((_, i) => i !== index);
  }
</script>

<div class="card stack">
  <h2>Todo List</h2>

  <form class="row" onsubmit={(e) => { e.preventDefault(); add(); }}>
    <input type="text" bind:value={newTask} placeholder="Add a task" />
    <button type="submit">Add</button>
  </form>

  <ul class="task-list">
    {#each tasks as task, index}
      <li class="task">
        <span>{task}</span>
        <button onclick={() => remove(index)}>Remove</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
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
    align-items: center;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  .task button {
    padding: var(--space-xs) var(--space-sm);
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/routes/lecture-05-loops
git commit -m "feat: add lecture 05 - loops"
```

---

### Task 8: Lecture 06 — Functions

**Files:**
- Create: `src/routes/lecture-06-functions/README.md`
- Create: `src/routes/lecture-06-functions/+page.svelte`
- Create: `src/routes/lecture-06-functions/project-01-unit-converter/+page.svelte`
- Create: `src/routes/lecture-06-functions/project-02-random-quote/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-06-functions/README.md`**

```markdown
# Lecture 06 — Functions

**Goal:** Bundle reusable logic into functions.

**Concepts:**
- Declaring functions with `function`.
- Parameters and return values.
- Calling a function from an event handler.

**Projects:**
1. Unit Converter — functions for km/miles and kg/lbs.
2. Random Quote — a function picks from an array of quotes.

**Try changing:** Add a Celsius-to-Fahrenheit function to the first project.
```

- [ ] **Step 2: Create `src/routes/lecture-06-functions/+page.svelte`**

```svelte
<script lang="ts">
  const projects = [
    { slug: 'project-01-unit-converter', title: 'Unit Converter' },
    { slug: 'project-02-random-quote', title: 'Random Quote' }
  ];
</script>

<h1>Lecture 06 — Functions</h1>
<p>Reusable blocks of logic.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-06-functions/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
```

- [ ] **Step 3: Create `src/routes/lecture-06-functions/project-01-unit-converter/+page.svelte`**

```svelte
<script lang="ts">
  let km = $state(5);
  let kg = $state(10);

  function kmToMiles(value: number): number {
    return value * 0.621371;
  }

  function kgToLbs(value: number): number {
    return value * 2.20462;
  }
</script>

<div class="card stack">
  <h2>Unit Converter</h2>

  <label class="row">
    Kilometers:
    <input type="number" bind:value={km} />
  </label>
  <p>{km} km = {kmToMiles(km).toFixed(2)} miles</p>

  <label class="row">
    Kilograms:
    <input type="number" bind:value={kg} />
  </label>
  <p>{kg} kg = {kgToLbs(kg).toFixed(2)} lbs</p>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  p {
    font-family: var(--font-mono);
    font-size: 1.125rem;
  }
</style>
```

- [ ] **Step 4: Create `src/routes/lecture-06-functions/project-02-random-quote/+page.svelte`**

```svelte
<script lang="ts">
  const quotes = [
    { text: 'Code is like humor. When you have to explain it, it’s bad.', author: 'Cory House' },
    { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
    { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' }
  ];

  let index = $state(0);

  function pickRandom() {
    let next = Math.floor(Math.random() * quotes.length);
    while (next === index && quotes.length > 1) {
      next = Math.floor(Math.random() * quotes.length);
    }
    index = next;
  }
</script>

<div class="card stack">
  <h2>Random Quote</h2>

  <blockquote>
    <p class="quote">{quotes[index].text}</p>
    <cite>— {quotes[index].author}</cite>
  </blockquote>

  <button onclick={pickRandom}>New quote</button>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  blockquote {
    margin: 0;
    padding: var(--space-md);
    border-inline-start: 4px solid var(--color-primary);
    background: var(--color-surface);
    border-radius: var(--radius);
  }

  .quote {
    font-family: var(--font-accent);
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    margin-block-end: var(--space-sm);
  }

  cite {
    color: var(--color-text-muted);
    font-style: normal;
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/routes/lecture-06-functions
git commit -m "feat: add lecture 06 - functions"
```

---

### Task 9: Lecture 07 — Events

**Files:**
- Create: `src/routes/lecture-07-events/README.md`
- Create: `src/routes/lecture-07-events/+page.svelte`
- Create: `src/routes/lecture-07-events/project-01-counter/+page.svelte`
- Create: `src/routes/lecture-07-events/project-02-keyboard-form/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-07-events/README.md`**

```markdown
# Lecture 07 — Events

**Goal:** Respond to user actions with event handlers.

**Concepts:**
- `onclick`, `oninput`, `onsubmit`, `onkeydown`.
- Preventing default form submission with `preventDefault`.
- Reading event data from the event object.

**Projects:**
1. Counter — buttons that change a number.
2. Keyboard Form — submit with a button or the Enter key.

**Try changing:** Add a keyboard shortcut to reset the counter.
```

- [ ] **Step 2: Create `src/routes/lecture-07-events/+page.svelte`**

```svelte
<script lang="ts">
  const projects = [
    { slug: 'project-01-counter', title: 'Counter' },
    { slug: 'project-02-keyboard-form', title: 'Keyboard Form' }
  ];
</script>

<h1>Lecture 07 — Events</h1>
<p>Reacting to clicks, typing, and keyboard input.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-07-events/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
```

- [ ] **Step 3: Create `src/routes/lecture-07-events/project-01-counter/+page.svelte`**

```svelte
<script lang="ts">
  let count = $state(0);

  function increment() {
    count = count + 1;
  }

  function decrement() {
    count = count - 1;
  }

  function reset() {
    count = 0;
  }
</script>

<div class="card stack">
  <h2>Counter</h2>

  <p class="count">{count}</p>

  <div class="row">
    <button onclick={decrement}>-</button>
    <button onclick={increment}>+</button>
    <button onclick={reset}>Reset</button>
  </div>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .count {
    font-family: var(--font-mono);
    font-size: clamp(2rem, 5vw, 4rem);
    text-align: center;
  }
</style>
```

- [ ] **Step 4: Create `src/routes/lecture-07-events/project-02-keyboard-form/+page.svelte`**

```svelte
<script lang="ts">
  let message = $state('');
  let lastSubmitted = $state('');

  function submit(e: Event) {
    e.preventDefault();
    lastSubmitted = message;
    message = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      message = '';
    }
  }
</script>

<!-- :has() styles the form when the input has focus. -->
<form class="card stack keyboard-form" onsubmit={submit}>
  <h2>Keyboard Form</h2>

  <label class="row">
    Message:
    <input
      type="text"
      bind:value={message}
      onkeydown={handleKeydown}
      placeholder="Type and press Enter"
    />
  </label>

  <button type="submit" disabled={message.trim() === ''}>Submit</button>

  {#if lastSubmitted}
    <p class="submitted">Last submitted: {lastSubmitted}</p>
  {/if}
</form>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .keyboard-form:has(input:focus) {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .submitted {
    color: var(--color-text-muted);
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/routes/lecture-07-events
git commit -m "feat: add lecture 07 - events"
```

---

### Task 10: Lecture 08 — Arrays

**Files:**
- Create: `src/routes/lecture-08-arrays/README.md`
- Create: `src/routes/lecture-08-arrays/+page.svelte`
- Create: `src/routes/lecture-08-arrays/project-01-grocery-list/+page.svelte`
- Create: `src/routes/lecture-08-arrays/project-02-random-picker/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-08-arrays/README.md`**

```markdown
# Lecture 08 — Arrays

**Goal:** Store and manipulate ordered collections of data.

**Concepts:**
- Creating arrays: `['a', 'b', 'c']`.
- Adding items: spread syntax or `.concat()`.
- Removing items: `.filter()`.
- Transforming items: `.map()`.
- Finding items: `.find()`.

**Projects:**
1. Grocery List — add, remove, and mark items bought.
2. Random Picker — add names and pick one randomly.

**Try changing:** Show the total number of items remaining in the grocery list.
```

- [ ] **Step 2: Create `src/routes/lecture-08-arrays/+page.svelte`**

```svelte
<script lang="ts">
  const projects = [
    { slug: 'project-01-grocery-list', title: 'Grocery List' },
    { slug: 'project-02-random-picker', title: 'Random Picker' }
  ];
</script>

<h1>Lecture 08 — Arrays</h1>
<p>Working with ordered lists of values.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-08-arrays/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
```

- [ ] **Step 3: Create `src/routes/lecture-08-arrays/project-01-grocery-list/+page.svelte`**

```svelte
<script lang="ts">
  type Item = {
    name: string;
    bought: boolean;
  };

  let newItem = $state('');
  let items = $state<Item[]>([
    { name: 'Milk', bought: false },
    { name: 'Bread', bought: false }
  ]);

  function add() {
    if (newItem.trim() !== '') {
      items = [...items, { name: newItem.trim(), bought: false }];
      newItem = '';
    }
  }

  function toggle(index: number) {
    items = items.map((item, i) => (i === index ? { ...item, bought: !item.bought } : item));
  }

  function remove(index: number) {
    items = items.filter((_, i) => i !== index);
  }
</script>

<div class="card stack">
  <h2>Grocery List</h2>

  <form class="row" onsubmit={(e) => { e.preventDefault(); add(); }}>
    <input type="text" bind:value={newItem} placeholder="Add an item" />
    <button type="submit">Add</button>
  </form>

  <ul class="grocery-list">
    {#each items as item, index}
      <li class="item" class:bought={item.bought}>
        <button class="toggle" onclick={() => toggle(index)}>
          {item.bought ? '✓' : '○'}
        </button>
        <span>{item.name}</span>
        <button class="remove" onclick={() => remove(index)}>Remove</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .grocery-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  .item:nth-child(even) {
    background: color-mix(in oklab, var(--color-surface) 95%, black);
  }

  .item.bought span {
    text-decoration: line-through;
    color: var(--color-text-muted);
  }

  .toggle,
  .remove {
    padding: var(--space-xs) var(--space-sm);
    font-size: 0.875rem;
  }

  .toggle {
    background: transparent;
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .remove {
    margin-inline-start: auto;
  }
</style>
```

- [ ] **Step 4: Create `src/routes/lecture-08-arrays/project-02-random-picker/+page.svelte`**

```svelte
<script lang="ts">
  let newName = $state('');
  let names = $state<string[]>(['Alice', 'Bob', 'Carol']);
  let winner = $state('');

  function add() {
    if (newName.trim() !== '') {
      names = [...names, newName.trim()];
      newName = '';
    }
  }

  function pick() {
    if (names.length > 0) {
      winner = names[Math.floor(Math.random() * names.length)];
    }
  }

  function clear() {
    names = [];
    winner = '';
  }
</script>

<div class="card stack">
  <h2>Random Picker</h2>

  <form class="row" onsubmit={(e) => { e.preventDefault(); add(); }}>
    <input type="text" bind:value={newName} placeholder="Add a name" />
    <button type="submit">Add</button>
  </form>

  <ul class="name-list">
    {#each names as name}
      <li>{name}</li>
    {/each}
  </ul>

  <div class="row">
    <button onclick={pick} disabled={names.length === 0}>Pick winner</button>
    <button onclick={clear}>Clear</button>
  </div>

  {#if winner}
    <p class="winner">Winner: {winner}</p>
  {/if}
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .name-list {
    list-style: disc;
    padding-inline-start: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .name-list li::marker {
    color: var(--color-primary);
  }

  .winner {
    font-size: 1.5rem;
    font-family: var(--font-accent);
    color: var(--color-success);
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/routes/lecture-08-arrays
git commit -m "feat: add lecture 08 - arrays"
```

---

### Task 11: Lecture 09 — Objects

**Files:**
- Create: `src/routes/lecture-09-objects/README.md`
- Create: `src/routes/lecture-09-objects/+page.svelte`
- Create: `src/routes/lecture-09-objects/project-01-profile-card/+page.svelte`
- Create: `src/routes/lecture-09-objects/project-02-product-list/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-09-objects/README.md`**

```markdown
# Lecture 09 — Objects

**Goal:** Group related data into objects and display it.

**Concepts:**
- Object literals: `{ key: value }`.
- Reading properties with dot notation.
- Arrays of objects.
- Updating an object while keeping reactivity.

**Projects:**
1. Profile Card — display a single user object.
2. Product List — render a list of product objects.

**Try changing:** Add a "favorite" toggle to the product list.
```

- [ ] **Step 2: Create `src/routes/lecture-09-objects/+page.svelte`**

```svelte
<script lang="ts">
  const projects = [
    { slug: 'project-01-profile-card', title: 'Profile Card' },
    { slug: 'project-02-product-list', title: 'Product List' }
  ];
</script>

<h1>Lecture 09 — Objects</h1>
<p>Grouping data and rendering arrays of objects.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-09-objects/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
```

- [ ] **Step 3: Create `src/routes/lecture-09-objects/project-01-profile-card/+page.svelte`**

```svelte
<script lang="ts">
  type User = {
    name: string;
    role: string;
    bio: string;
    location: string;
  };

  let user = $state<User>({
    name: 'Sam Rivera',
    role: 'Frontend Developer',
    bio: 'Teaching programming through small, useful web apps.',
    location: 'Remote'
  });
</script>

<div class="card profile">
  <h2>{user.name}</h2>
  <p class="role">{user.role}</p>
  <p class="bio">{user.bio}</p>
  <p class="location">Location: {user.location}</p>
</div>

<style>
  .profile {
    h2 {
      font-family: var(--font-heading);
      font-size: 1.75rem;
    }

    .role {
      color: var(--color-primary);
      font-weight: 700;
      margin-block-end: var(--space-md);
    }

    .bio {
      line-height: 1.6;
      margin-block-end: var(--space-md);
    }

    .location {
      color: var(--color-text-muted);
      font-size: 0.875rem;
    }
  }
</style>
```

- [ ] **Step 4: Create `src/routes/lecture-09-objects/project-02-product-list/+page.svelte`**

```svelte
<script lang="ts">
  type Product = {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
  };

  let products = $state<Product[]>([
    { id: 1, name: 'Notebook', price: 12, inStock: true },
    { id: 2, name: 'Pen set', price: 8, inStock: true },
    { id: 3, name: 'Desk lamp', price: 35, inStock: false }
  ]);

  function toggleStock(id: number) {
    products = products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p));
  }
</script>

<div class="card stack">
  <h2>Product List</h2>

  <ul class="product-list">
    {#each products as product}
      <li class="product">
        <div>
          <h3>{product.name}</h3>
          <p class="price">${product.price}</p>
        </div>
        <button class:stock={product.inStock} onclick={() => toggleStock(product.id)}>
          {product.inStock ? 'In stock' : 'Out of stock'}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .product-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);

    h3 {
      font-family: var(--font-heading);
      margin-block-end: var(--space-xs);
    }

    .price {
      color: var(--color-text-muted);
    }

    button {
      background: var(--color-error);
      border-color: var(--color-error);
    }

    button.stock {
      background: var(--color-success);
      border-color: var(--color-success);
    }
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/routes/lecture-09-objects
git commit -m "feat: add lecture 09 - objects"
```

---

### Task 12: Lecture 10 — Capstone: Flashcard Quiz

**Files:**
- Create: `src/routes/lecture-10-capstone/README.md`
- Create: `src/routes/lecture-10-capstone/+page.svelte`

- [ ] **Step 1: Create `src/routes/lecture-10-capstone/README.md`**

```markdown
# Lecture 10 — Capstone: Flashcard Quiz

**Goal:** Combine every concept from Module 1 into one app.

**Concepts used:**
- Variables and input/output.
- Numbers, strings, and operators.
- Comparisons and booleans.
- If / else.
- Loops.
- Functions.
- Events.
- Arrays.
- Objects.

**What it does:**
- Shows a question card.
- Accepts an answer.
- Tracks correct/incorrect.
- Moves to the next card.
- Shows a final score.

**Try changing:** Add a hint button that reveals the first letter of the answer.
```

- [ ] **Step 2: Create `src/routes/lecture-10-capstone/+page.svelte`**

```svelte
<script lang="ts">
  type Card = {
    question: string;
    answer: string;
  };

  let cards = $state<Card[]>([
    { question: 'What does HTML stand for?', answer: 'HyperText Markup Language' },
    { question: 'Which CSS property changes text color?', answer: 'color' },
    { question: 'What keyword declares a variable in Svelte?', answer: 'let' },
    { question: 'What symbol starts a Svelte template expression?', answer: '{' },
    { question: 'Which function turns a string into a number?', answer: 'Number' }
  ]);

  let currentIndex = $state(0);
  let userAnswer = $state('');
  let score = $state(0);
  let answered = $state(false);
  let isCorrect = $state(false);
  let finished = $state(false);

  function normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  function check() {
    if (userAnswer.trim() === '') return;
    answered = true;
    isCorrect = normalize(userAnswer) === normalize(cards[currentIndex].answer);
    if (isCorrect) score = score + 1;
  }

  function next() {
    if (currentIndex < cards.length - 1) {
      currentIndex = currentIndex + 1;
      userAnswer = '';
      answered = false;
      isCorrect = false;
    } else {
      finished = true;
    }
  }

  function restart() {
    currentIndex = 0;
    userAnswer = '';
    score = 0;
    answered = false;
    isCorrect = false;
    finished = false;
    cards = cards.sort(() => Math.random() - 0.5);
  }
</script>

<div class="card stack quiz">
  <h2>Flashcard Quiz</h2>

  {#if finished}
    <div class="finished">
      <p class="score">You scored {score} out of {cards.length}</p>
      <button onclick={restart}>Restart</button>
    </div>
  {:else}
    <p class="progress">Card {currentIndex + 1} of {cards.length}</p>

    <div class="question">
      <p>{cards[currentIndex].question}</p>
    </div>

    {#if answered}
      <p class="feedback" class:correct={isCorrect} class:wrong={!isCorrect}>
        {isCorrect ? 'Correct!' : `The answer was: ${cards[currentIndex].answer}`}
      </p>
    {/if}

    <label class="row">
      Your answer:
      <input type="text" bind:value={userAnswer} disabled={answered} />
    </label>

    <div class="row">
      {#if !answered}
        <button onclick={check} disabled={userAnswer.trim() === ''}>Check</button>
      {:else}
        <button onclick={next}>Next</button>
      {/if}
    </div>

    <p class="score-inline">Score: {score}</p>
  {/if}
</div>

<style>
  .quiz {
    container-type: inline-size;

    h2 {
      font-family: var(--font-heading);
    }

    .progress {
      color: var(--color-text-muted);
    }

    .question {
      padding: var(--space-lg);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      font-size: 1.25rem;
    }

    .feedback {
      font-weight: 700;
    }

    .feedback.correct {
      color: var(--color-success);
    }

    .feedback.wrong {
      color: var(--color-error);
    }

    .score-inline {
      font-family: var(--font-mono);
    }

    .finished {
      text-align: center;
    }

    .score {
      font-size: 1.5rem;
      font-family: var(--font-accent);
      margin-block-end: var(--space-md);
    }
  }

  @container (min-width: 40ch) {
    .quiz .row {
      flex-wrap: nowrap;
    }
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/lecture-10-capstone
git commit -m "feat: add lecture 10 capstone - flashcard quiz"
```

---

### Task 13: Add repo README and full syllabus

**Files:**
- Create: `README.md`
- Create: `SYLLABUS.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# Web Apps with Svelte

A beginner-first programming course that teaches web app development through Svelte-flavored JavaScript and TypeScript.

Students start in the [Svelte playground](https://svelte.dev/playground), then see the same concepts organized inside this repo.

## Quick start

Requires [Deno](https://deno.com/).

```bash
deno task dev
```

Open http://localhost:5173.

## Toolchain

| Tool | Role | Why it is here |
|------|------|----------------|
| **Deno** | Runtime and package manager | Runs TypeScript and npm packages without a separate Node install. |
| **Vite** | Dev server and bundler | The build tool that SvelteKit is built on. |
| **SvelteKit** | App framework | File-based routing, layouts, and the structure used in real Svelte apps. |
| **Biome** | Formatter and linter | One tool that replaces both Prettier and ESLint. |
| **Lightning CSS** | CSS transformer | Parses and minifies modern CSS such as nesting and custom properties. |

## Scripts

- `deno task dev` — start the dev server.
- `deno task build` — build for production.
- `deno task check` — type-check and lint.
- `deno task format` — format all files.

## Course structure

- `src/routes/lecture-NN-*/` — lecture overview and projects.
- `src/lib/styles/` — shared CSS custom properties, reset, and utilities.
- `SYLLABUS.md` — full course roadmap.

## TypeScript style

TypeScript is used like JavaScript with light annotations: `let count: number = 0`, typed parameters, and simple return types. No advanced type tricks.
```

- [ ] **Step 2: Create `SYLLABUS.md`**

```markdown
# Web Apps with Svelte — Syllabus

## Module 1: Svelte-flavored JS/TS

1. Input / Output & Variables
2. Numbers, Strings & Operators
3. Comparisons & Booleans
4. If / Else
5. Loops
6. Functions
7. Events
8. Arrays
9. Objects
10. Capstone: Flashcard Quiz

## Module 2: Svelte 5 fundamentals

- Reactivity with runes: `$state`, `$derived`, `$effect`
- Props: `$props`, default values
- Logic blocks: `{#if}`, `{#each}`, keyed `{#each}`, `{#await}`
- Events: DOM events, modifiers, component events
- Bindings: `bind:value`, `bind:checked`, `bind:this`

## Module 3: Svelte beyond components

- Lifecycle: `$effect`, cleanup functions
- Stores: writable, readable, derived
- Special elements: `<svelte:head>`, `<svelte:window>`, `<svelte:element>`
- Transitions and animations
- Actions: `use:action`
- Classes and styles
- Component composition: slots, snippets, render tags
- Modules and context

## Module 4: AI-driven apps

- Calling the Groq API
- `async/await` and `fetch`
- Loading, error, and success states
- Smart Recipe Generator capstone
```

- [ ] **Step 3: Commit**

```bash
git add README.md SYLLABUS.md
git commit -m "docs: add README and full syllabus"
```

---

### Task 14: Skeleton routes for later modules

**Files:**
- Create: `src/routes/lecture-11-svelte-reactivity/README.md`
- Create: `src/routes/lecture-11-svelte-reactivity/+page.svelte`
- Create: `src/routes/lecture-12-svelte-props/README.md`
- Create: `src/routes/lecture-12-svelte-props/+page.svelte`
- Create: `src/routes/lecture-13-svelte-logic/README.md`
- Create: `src/routes/lecture-13-svelte-logic/+page.svelte`
- Create: `src/routes/lecture-14-svelte-events/README.md`
- Create: `src/routes/lecture-14-svelte-events/+page.svelte`
- Create: `src/routes/lecture-15-svelte-bindings/README.md`
- Create: `src/routes/lecture-15-svelte-bindings/+page.svelte`
- Create: `src/routes/lecture-16-svelte-lifecycle/README.md`
- Create: `src/routes/lecture-16-svelte-lifecycle/+page.svelte`
- Create: `src/routes/lecture-17-svelte-stores/README.md`
- Create: `src/routes/lecture-17-svelte-stores/+page.svelte`
- Create: `src/routes/lecture-18-svelte-transitions/README.md`
- Create: `src/routes/lecture-18-svelte-transitions/+page.svelte`
- Create: `src/routes/lecture-19-svelte-composition/README.md`
- Create: `src/routes/lecture-19-svelte-composition/+page.svelte`
- Create: `src/routes/lecture-20-ai-recipe-generator/README.md`
- Create: `src/routes/lecture-20-ai-recipe-generator/+page.svelte`

- [ ] **Step 1: Create a helper script to generate skeletons**

Run:

```bash
python3 - <<'PY'
from pathlib import Path

lectures = [
    ('lecture-11-svelte-reactivity', 'Svelte Reactivity'),
    ('lecture-12-svelte-props', 'Svelte Props'),
    ('lecture-13-svelte-logic', 'Svelte Logic Blocks'),
    ('lecture-14-svelte-events', 'Svelte Events'),
    ('lecture-15-svelte-bindings', 'Svelte Bindings'),
    ('lecture-16-svelte-lifecycle', 'Svelte Lifecycle'),
    ('lecture-17-svelte-stores', 'Svelte Stores'),
    ('lecture-18-svelte-transitions', 'Svelte Transitions & Actions'),
    ('lecture-19-svelte-composition', 'Svelte Composition'),
    ('lecture-20-ai-recipe-generator', 'AI Recipe Generator'),
]

for slug, title in lectures:
    folder = Path('src/routes') / slug
    folder.mkdir(parents=True, exist_ok=True)

    readme = folder / 'README.md'
    readme.write_text(f'# {title}\n\nThis lecture is planned for a future module.\n')

    page = folder / '+page.svelte'
    page.write_text(f'''<script lang="ts">
</script>

<div class="card">
  <h1>{title}</h1>
  <p>Coming in a later module.</p>
</div>

<style>
  h1 {{
    font-family: var(--font-heading);
  }}
</style>
''')
PY
```

Expected result: ten skeleton lecture folders are created with a README and a placeholder page.

- [ ] **Step 2: Commit**

```bash
git add src/routes/lecture-11-* src/routes/lecture-12-* src/routes/lecture-13-* src/routes/lecture-14-* src/routes/lecture-15-* src/routes/lecture-16-* src/routes/lecture-17-* src/routes/lecture-18-* src/routes/lecture-19-* src/routes/lecture-20-*
git commit -m "chore: add skeleton routes for future modules"
```

---

### Task 15: Final verification

- [ ] **Step 1: Format all files**

Run:

```bash
deno task format
```

Expected: Biome reports that files were formatted successfully.

- [ ] **Step 2: Type-check and lint**

Run:

```bash
deno task check
```

Expected: No type errors and no lint errors.

- [ ] **Step 3: Build for production**

Run:

```bash
deno task build
```

Expected: Build completes without errors.

- [ ] **Step 4: Start the dev server and spot-check routes**

Run:

```bash
deno task dev &
sleep 5
```

Then verify pages load:

```bash
curl -s http://localhost:5173/ | grep -o 'Web Apps with Svelte'
curl -s http://localhost:5173/lecture-01-io/project-01-greeter | grep -o 'Greeter'
curl -s http://localhost:5173/lecture-10-capstone | grep -o 'Flashcard Quiz'
```

Expected: All three grep checks return matches.

Stop the server:

```bash
kill %1
```

- [ ] **Step 5: Commit any formatting fixes**

```bash
git add -A
git diff --cached --quiet || git commit -m "style: format and check"
```

- [ ] **Step 6: Push to origin**

```bash
git push
```

Expected: `main` is pushed to `origin`.

---

## Plan self-review

### Spec coverage

| Spec section | Plan task |
|--------------|-----------|
| Runnable SvelteKit project | Tasks 1–2 |
| Deno + Vite + Biome + Lightning CSS | Task 1 |
| Lecture 01 | Task 3 |
| Lecture 02 | Task 4 |
| Lecture 03 | Task 5 |
| Lecture 04 | Task 6 |
| Lecture 05 | Task 7 |
| Lecture 06 | Task 8 |
| Lecture 07 | Task 9 |
| Lecture 08 | Task 10 |
| Lecture 09 | Task 11 |
| Lecture 10 capstone | Task 12 |
| Modern CSS per lecture | Each project uses the assigned CSS feature |
| Google Fonts and SVG favicon | Task 1 (favicon), Task 2 (fonts) |
| README and SYLLABUS | Task 13 |
| Skeleton future modules | Task 14 |
| No AI-slop, relevant comments | Code comments explain why, READMEs are short |

### Placeholder scan

- No "TBD", "TODO", "implement later", or "fill in details".
- No vague instructions like "add error handling".
- Every step that changes code includes the code.
- Commands include expected output.

### Type consistency

- All reactive variables use `$state`.
- Derived values use `$derived`.
- Function parameters are typed lightly.
- Array/object types use simple inline interfaces.
- Event handlers use the correct Svelte 5 syntax: `onclick={handler}` and `onsubmit={(e) => ...}`.

### Known risks

- Deno + SvelteKit npm compatibility should be verified during Task 15; if issues appear, the plan may need a Node/npm fallback.
