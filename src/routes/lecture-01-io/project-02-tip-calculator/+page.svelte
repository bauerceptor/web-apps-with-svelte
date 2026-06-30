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
