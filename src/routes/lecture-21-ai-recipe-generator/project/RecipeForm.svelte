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
