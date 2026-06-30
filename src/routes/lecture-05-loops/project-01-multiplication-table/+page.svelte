<script lang="ts">
let number = $state(5);

// The range 1-10 keeps the table short and readable.
const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
