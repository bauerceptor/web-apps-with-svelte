# Module 4 — AI-driven Apps: Design Spec

## Overview

Module 4 is the final module of the course. It introduces students to calling an external AI API from a SvelteKit app, handling asynchronous workflows, and presenting loading, error, and success states. The capstone is a Smart Recipe Generator.

**Stack:** SvelteKit, Svelte 5 runes, Deno, Vite, Lightning CSS, Biome.
**Pattern:** Lecture 21 is a single-project capstone, following the same route structure as the other capstones (overview `+page.svelte` + `README.md` + `project/` sub-route).

## Module-level learning goals

- Call an external API with `fetch` using `async/await`.
- Use a SvelteKit server route to keep API keys out of the browser.
- Manage loading, error, and success UI states.
- Parse and render an AI response in a user-friendly format.

## Lecture 21 — Smart Recipe Generator

### Route structure

- `src/routes/lecture-21-ai-recipe-generator/+page.svelte` — overview page.
- `src/routes/lecture-21-ai-recipe-generator/README.md` — learning goals and instructions.
- `src/routes/lecture-21-ai-recipe-generator/project/+page.svelte` — main app shell.
- `src/routes/lecture-21-ai-recipe-generator/project/RecipeForm.svelte` — input form.
- `src/routes/lecture-21-ai-recipe-generator/project/RecipeResult.svelte` — displays the recipe.
- `src/routes/lecture-21-ai-recipe-generator/project/StatusBadge.svelte` — loading/error/idle indicator.
- `src/routes/api/recipe/+server.ts` — server endpoint that calls Groq.
- `.env.example` — example environment file.

### UI behavior

**RecipeForm**
- Textarea for ingredients (e.g., "chicken, rice, broccoli").
- Optional select for cuisine style (Italian, Mexican, Indian, Any).
- Optional select for meal type (Breakfast, Lunch, Dinner, Snack).
- Submit button.

**StatusBadge**
- Idle: prompt to enter ingredients.
- Loading: spinner + "Asking the chef…".
- Error: red message + retry button.
- Success: subtle success note.

**RecipeResult**
- Render the recipe as a styled card.
- Parse the response into:
  - Title (first heading)
  - Ingredients list
  - Instructions list
- Fallback to rendering raw markdown if parsing fails.

### Server endpoint `/api/recipe`

- Accepts POST with JSON body: `{ ingredients, style?, meal? }`.
- Reads `GROQ_API_KEY` from `process.env`.
- If `GROQ_API_KEY` is missing, returns a mock recipe after a short delay so the UI still works.
- If present, calls `https://api.groq.com/openai/v1/chat/completions` with:
  - model: `llama3-8b-8192`
  - system prompt asking for a concise recipe in markdown
  - user prompt containing ingredients and options
- Returns JSON: `{ title, ingredients: string[], instructions: string[], raw: string }`.
- Handles API errors gracefully with a clear message.

### Data flow

1. User fills form and submits.
2. `+page.svelte` sets `status = 'loading'` and calls `fetch('/api/recipe', { method: 'POST', body: JSON.stringify(...) })`.
3. On success, `status = 'success'` and `recipe` is populated.
4. On failure, `status = 'error'` and `errorMessage` is shown.

### Error handling

- Network errors: "Could not reach the recipe service. Please try again."
- API errors (non-200): propagate a message from the server or a generic fallback.
- Missing key: mock recipe fallback (no error shown).

### CSS approach

- Continue the existing design system.
- Introduce a subtle loading animation using `animation` and `@keyframes`.
- Use a card layout for the result.

### Verification

After implementation:
- `deno task format`
- `deno task lint`
- `deno task check`
- `deno task build`
- Manual spot-check: submit the form and verify mock recipe appears.

### Out of scope

- Real user authentication.
- Recipe history/persistence.
- Streaming responses.
- Image generation.
