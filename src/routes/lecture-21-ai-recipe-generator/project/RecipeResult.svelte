<script lang="ts">
import type { RecipeResponse } from '$lib/recipe';

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
