# Module 4 — AI-driven Apps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the final lecture (21) of the Svelte course: a Smart Recipe Generator that calls the Groq API with loading/error/success states and a mock fallback.

**Architecture:** A SvelteKit server route proxies requests to Groq so the API key stays server-side. The UI is split into a form, status badge, and result card. If `GROQ_API_KEY` is missing, the server returns a mock recipe so the app works immediately for students.

**Tech Stack:** SvelteKit, Svelte 5 runes, Deno, Vite, Lightning CSS, Biome.

---

## File structure

Files to create / modify:

- `src/routes/+page.svelte` — add lecture 21 to the course index.
- `src/routes/lecture-21-ai-recipe-generator/+page.svelte` — overview page.
- `src/routes/lecture-21-ai-recipe-generator/README.md` — learning goals and instructions.
- `src/routes/lecture-21-ai-recipe-generator/project/+page.svelte` — main app shell.
- `src/routes/lecture-21-ai-recipe-generator/project/RecipeForm.svelte` — ingredient/options form.
- `src/routes/lecture-21-ai-recipe-generator/project/RecipeResult.svelte` — recipe display card.
- `src/routes/lecture-21-ai-recipe-generator/project/StatusBadge.svelte` — loading/error/idle indicator.
- `src/routes/api/recipe/+server.ts` — server endpoint calling Groq (or mock fallback).
- `.env.example` — example environment file.

The existing placeholder `src/routes/lecture-21-ai-recipe-generator/+page.svelte` and `README.md` will be overwritten.

---

### Task 1: Create isolated worktree and verify baseline

**Files:**
- Create branch: `module-4`
- Create worktree: `.worktrees/module-4`

- [ ] **Step 1: Create branch and worktree**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte"
git checkout main
git pull
git branch -D module-4 2>/dev/null || true
git worktree add ".worktrees/module-4" -b module-4
cd ".worktrees/module-4"
```

- [ ] **Step 2: Install Deno locally in the worktree**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
curl -fsSL https://deno.land/install.sh | DENO_INSTALL="$PWD/.deno" sh
export PATH="$PWD/.deno/bin:$PATH"
deno --version
```

Expected output shows `deno 2.x.x`.

- [ ] **Step 3: Verify baseline checks pass**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
export PATH="$PWD/.deno/bin:$PATH"
deno task format
deno task lint
deno task check
deno task build
```

Expected: all pass with zero errors.

- [ ] **Step 4: Commit baseline marker**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
git commit --allow-empty -m "chore: start module-4 worktree"
git push -u origin module-4
```

---

### Task 2: Update course index for lecture 21

**Files:**
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Add lecture 21 to the array**

Add this entry after lecture 20:

```svelte
{ num: 21, slug: 'lecture-21-ai-recipe-generator', title: 'Capstone: Smart Recipe Generator' },
```

- [ ] **Step 2: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
git add src/routes/+page.svelte
git commit -m "feat: add lecture 21 to course index"
```

---

### Task 3: Lecture 21 overview and README

**Files:**
- Create/overwrite: `src/routes/lecture-21-ai-recipe-generator/+page.svelte`
- Create/overwrite: `src/routes/lecture-21-ai-recipe-generator/README.md`

- [ ] **Step 1: Write overview page**

```svelte
<script lang="ts">
const features = [
  'Calls the Groq API with fetch',
  'Server-side API route keeps the key secret',
  'Loading, error, and success states',
  'Mock recipe fallback when no API key is set',
];
</script>

<div class="card stack">
  <h1>Capstone: Smart Recipe Generator</h1>

  <p>
    The final project brings together everything from the course. You enter
    ingredients, the app asks an AI chef for a recipe, and the result is shown
    in a clean card.
  </p>

  <h2>What you will practice</h2>
  <ul class="concept-list">
    {#each features as feature}
      <li>{feature}</li>
    {/each}
  </ul>

  <a class="project-link" href="/lecture-21-ai-recipe-generator/project">
    Open Recipe Generator
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

- [ ] **Step 2: Write README**

```markdown
# Lecture 21 — Smart Recipe Generator

**Goal:** Build an AI-driven app that generates recipes from a list of ingredients.

**Concepts covered:**
- Calling an external API with `fetch` and `async/await`.
- Using a SvelteKit server route to hide API keys.
- Loading, error, and success states.
- Parsing and rendering an AI response.

**How to run with a real AI:**
1. Copy `.env.example` to `.env`.
2. Add your `GROQ_API_KEY` to `.env`.
3. Restart the dev server.

Without a key the app returns a mock recipe so the UI still works.

**Try changing:** Add a "save to favorites" button or a recipe history list.
```

- [ ] **Step 3: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
git add src/routes/lecture-21-ai-recipe-generator
git commit -m "feat: add lecture 21 overview and readme"
```

---

### Task 4: Server API route with Groq integration and mock fallback

**Files:**
- Create: `src/routes/api/recipe/+server.ts`
- Create: `.env.example`

- [ ] **Step 1: Create `.env.example`**

```text
GROQ_API_KEY=gsk_your_groq_api_key_here
```

- [ ] **Step 2: Write the server route**

```ts
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export type RecipeRequest = {
  ingredients: string;
  style?: string;
  meal?: string;
};

export type RecipeResponse = {
  title: string;
  ingredients: string[];
  instructions: string[];
  raw: string;
  mock: boolean;
};

const MOCK_RECIPE: RecipeResponse = {
  title: 'Demo Vegetable Stir-Fry',
  ingredients: ['2 cups mixed vegetables', '2 tbsp soy sauce', '1 tbsp oil', '1 tsp garlic'],
  instructions: [
    'Heat oil in a pan over medium heat.',
    'Add garlic and cook for 30 seconds.',
    'Add vegetables and stir-fry for 5–7 minutes.',
    'Pour in soy sauce, toss, and serve.',
  ],
  raw: '# Demo Vegetable Stir-Fry\n\n## Ingredients\n- 2 cups mixed vegetables\n- 2 tbsp soy sauce\n- 1 tbsp oil\n- 1 tsp garlic\n\n## Instructions\n1. Heat oil in a pan over medium heat.\n2. Add garlic and cook for 30 seconds.\n3. Add vegetables and stir-fry for 5–7 minutes.\n4. Pour in soy sauce, toss, and serve.',
  mock: true,
};

function buildPrompt(request: RecipeRequest): string {
  const { ingredients, style, meal } = request;
  let prompt = `Create a recipe using these ingredients: ${ingredients}.`;
  if (style && style !== 'any') prompt += ` The cuisine style should be ${style}.`;
  if (meal && meal !== 'any') prompt += ` This should be suitable for ${meal}.`;
  prompt +=
    ' Respond with a recipe in markdown. Start with a heading for the title, then an "Ingredients" list, then an "Instructions" numbered list.';
  return prompt;
}

function parseRecipe(raw: string): RecipeResponse {
  const titleMatch = raw.match(/^#\s*(.+)$/m);
  const title = titleMatch?.[1].trim() ?? 'Generated Recipe';

  const ingredientsMatch = raw.match(/##\s*Ingredients\s*\n([\s\S]*?)(?=\n##\s*Instructions|$)/i);
  const ingredients = ingredientsMatch
    ? ingredientsMatch[1]
        .split('\n')
        .map((line) => line.replace(/^[-*]\s*/, '').trim())
        .filter(Boolean)
    : [];

  const instructionsMatch = raw.match(/##\s*Instructions\s*\n([\s\S]*?)(?=\n##|$)/i);
  const instructions = instructionsMatch
    ? instructionsMatch[1]
        .split('\n')
        .map((line) => line.replace(/^\d+\.\s*/, '').trim())
        .filter(Boolean)
    : [];

  return { title, ingredients, instructions, raw, mock: false };
}

async function fetchRecipe(request: RecipeRequest): Promise<RecipeResponse> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey.startsWith('gsk_your')) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_RECIPE;
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful recipe assistant. Always respond with a markdown recipe: a title heading, an Ingredients list, and a numbered Instructions list.',
        },
        { role: 'user', content: buildPrompt(request) },
      ],
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Groq API error ${response.status}: ${body}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };
  const raw = data.choices[0]?.message?.content ?? '';

  return parseRecipe(raw);
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = (await request.json()) as RecipeRequest;
    const recipe = await fetchRecipe(body);
    return json(recipe);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    throw error(500, message);
  }
};
```

- [ ] **Step 3: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
git add src/routes/api/recipe/+server.ts .env.example
git commit -m "feat: add recipe API route with Groq and mock fallback"
```

---

### Task 5: UI components

**Files:**
- Create: `src/routes/lecture-21-ai-recipe-generator/project/StatusBadge.svelte`
- Create: `src/routes/lecture-21-ai-recipe-generator/project/RecipeForm.svelte`
- Create: `src/routes/lecture-21-ai-recipe-generator/project/RecipeResult.svelte`

- [ ] **Step 1: Write StatusBadge**

```svelte
<script lang="ts">
let { status, message = '' } = $props<{
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}>();
</script>

<div class="status" class:loading={status === 'loading'} class:error={status === 'error'} class:success={status === 'success'}>
  {#if status === 'idle'}
    <span>Enter ingredients below to generate a recipe.</span>
  {:else if status === 'loading'}
    <span class="spinner" aria-hidden="true"></span>
    <span>Asking the chef…</span>
  {:else if status === 'success'}
    <span>Here is your recipe!</span>
  {:else if status === 'error'}
    <span>{message || 'Something went wrong. Please try again.'}</span>
  {/if}
</div>

<style>
  .status {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text-muted);
  }

  .status.loading {
    color: var(--color-text);
  }

  .status.success {
    color: var(--color-success);
  }

  .status.error {
    color: var(--color-error);
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
```

- [ ] **Step 2: Write RecipeForm**

```svelte
<script lang="ts">
let { onSubmit, disabled } = $props<{
  onSubmit: (data: { ingredients: string; style: string; meal: string }) => void;
  disabled: boolean;
}>();

let ingredients = $state('');
let style = $state('any');
let meal = $state('any');

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  if (ingredients.trim() === '') return;
  onSubmit({ ingredients: ingredients.trim(), style, meal });
}
</script>

<form class="card stack recipe-form" onsubmit={handleSubmit}>
  <label>
    Ingredients
    <textarea
      bind:value={ingredients}
      rows="3"
      placeholder="e.g. chicken, rice, broccoli"
      required
    ></textarea>
  </label>

  <div class="row">
    <label>
      Style
      <select bind:value={style}>
        <option value="any">Any</option>
        <option value="italian">Italian</option>
        <option value="mexican">Mexican</option>
        <option value="indian">Indian</option>
        <option value="asian">Asian</option>
      </select>
    </label>

    <label>
      Meal
      <select bind:value={meal}>
        <option value="any">Any</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
      </select>
    </label>
  </div>

  <button type="submit" disabled={disabled || ingredients.trim() === ''}>
    Generate recipe
  </button>
</form>

<style>
  .recipe-form {
    gap: var(--space-md);
  }

  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }

  textarea,
  select {
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-family: var(--font-body);
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: var(--space-md);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

- [ ] **Step 3: Write RecipeResult**

```svelte
<script lang="ts">
import type { RecipeResponse } from '../../api/recipe/+server';

let { recipe } = $props<{ recipe: RecipeResponse }>();
</script>

<article class="card stack recipe">
  <header>
    <h2>{recipe.title}</h2>
    {#if recipe.mock}
      <span class="badge">Demo</span>
    {/if}
  </header>

  <section>
    <h3>Ingredients</h3>
    <ul>
      {#each recipe.ingredients as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <section>
    <h3>Instructions</h3>
    <ol>
      {#each recipe.instructions as step}
        <li>{step}</li>
      {/each}
    </ol>
  </section>
</article>

<style>
  .recipe {
    gap: var(--space-lg);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
  }

  h2 {
    margin: 0;
  }

  .badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    padding: var(--space-xs) var(--space-sm);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    color: var(--color-text-muted);
  }

  h3 {
    font-size: 1rem;
    margin-block-end: var(--space-sm);
  }

  ul,
  ol {
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
  }

  li {
    margin-block: var(--space-xs);
  }
</style>
```

- [ ] **Step 4: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
git add src/routes/lecture-21-ai-recipe-generator/project
git commit -m "feat: add recipe generator UI components"
```

---

### Task 6: Project page

**Files:**
- Create: `src/routes/lecture-21-ai-recipe-generator/project/+page.svelte`

- [ ] **Step 1: Write the page**

```svelte
<script lang="ts">
import RecipeForm from './RecipeForm.svelte';
import RecipeResult from './RecipeResult.svelte';
import StatusBadge from './StatusBadge.svelte';
import type { RecipeResponse } from '../../api/recipe/+server';

let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
let recipe = $state<RecipeResponse | null>(null);
let errorMessage = $state('');

async function handleSubmit(data: { ingredients: string; style: string; meal: string }) {
  status = 'loading';
  errorMessage = '';
  recipe = null;

  try {
    const response = await fetch('/api/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const body = await response.json();
      throw new Error(body.message ?? `Server error ${response.status}`);
    }

    recipe = (await response.json()) as RecipeResponse;
    status = 'success';
  } catch (err) {
    status = 'error';
    errorMessage = err instanceof Error ? err.message : 'Could not fetch recipe.';
  }
}
</script>

<div class="stack">
  <RecipeForm onSubmit={handleSubmit} disabled={status === 'loading'} />
  <StatusBadge {status} message={errorMessage} />

  {#if recipe}
    <RecipeResult {recipe} />
  {/if}
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
git add src/routes/lecture-21-ai-recipe-generator/project/+page.svelte
git commit -m "feat: add recipe generator project page"
```

---

### Task 7: Final verification

- [ ] **Step 1: Run formatter, linter, type check, and build**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
export PATH="$PWD/.deno/bin:$PATH"
deno task format
deno task lint
deno task check
deno task build
```

Expected: all pass with zero errors.

- [ ] **Step 2: Spot-check the route in dev server**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
export PATH="$PWD/.deno/bin:$PATH"
deno task dev
```

Open `http://localhost:5173/lecture-21-ai-recipe-generator/project`, submit the form, and verify a recipe card appears (it should be the mock recipe unless `GROQ_API_KEY` is set).

- [ ] **Step 3: Commit any formatting fixes**

```bash
cd "/home/red/Classes/Web Apps with Svelte/.worktrees/module-4"
git add -A
git diff --cached --quiet || git commit -m "style: format and check module 4"
```

---

### Task 8: Merge back to main

- [ ] **Step 1: Merge and push**

Run:

```bash
cd "/home/red/Classes/Web Apps with Svelte"
git checkout main
git pull
git merge module-4 --no-edit
export PATH="$PWD/.worktrees/module-4/.deno/bin:$PATH"
deno task format
deno task lint
deno task check
deno task build
git push
```

- [ ] **Step 2: Clean up worktree**

```bash
cd "/home/red/Classes/Web Apps with Svelte"
git worktree remove ".worktrees/module-4"
git worktree prune
git branch -d module-4
git push origin --delete module-4
```

---

## Self-review checklist

- **Spec coverage:**
  - Lecture 21 overview + README → Task 3.
  - Server route with Groq + mock fallback → Task 4.
  - StatusBadge, RecipeForm, RecipeResult components → Task 5.
  - Project page wiring states and fetch → Task 6.
  - Course index update → Task 2.
  - Verification and merge → Tasks 7–8.
- **Placeholder scan:** No TBD/TODO placeholders. Each step includes file paths and code.
- **Type consistency:** `RecipeRequest`/`RecipeResponse` types are consistent between server route and project page.
