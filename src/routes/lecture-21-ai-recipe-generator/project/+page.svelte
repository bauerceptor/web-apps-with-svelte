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
