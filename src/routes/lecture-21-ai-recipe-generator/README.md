# Lecture 21 — Module 4 Capstone: Smart Recipe Generator

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
