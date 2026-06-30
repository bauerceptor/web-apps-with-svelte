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
