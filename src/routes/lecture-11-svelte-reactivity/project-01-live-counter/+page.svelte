<script lang="ts">
let count = $state(0);
let history = $state<number[]>([0]);

function increment() {
  count = count + 1;
  history = [...history, count];
}

function decrement() {
  count = count - 1;
  history = [...history, count];
}

function reset() {
  count = 0;
  history = [0];
}

// $effect runs after the DOM updates, so the tab title stays in sync with the UI.
$effect(() => {
  document.title = `Count: ${count}`;

  return () => {
    document.title = 'Web Apps with Svelte';
  };
});
</script>

<div class="card stack counter">
  <h2>Live Counter</h2>

  <p class="value" class:positive={count > 0} class:negative={count < 0}>
    {count}
  </p>

  <div class="row controls">
    <button onclick={decrement}>Decrement</button>
    <button onclick={increment}>Increment</button>
    <button onclick={reset}>Reset</button>
  </div>

  <div class="history">
    <h3>History</h3>
    <ul>
      {#each history as value, index (value + '-' + index)}
        <li>{value}</li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .counter {
    --value-color: var(--color-text);
  }

  .value {
    font-size: 4rem;
    font-weight: 700;
    text-align: center;
    color: var(--value-color);
    transition:
      color 0.3s ease,
      transform 0.3s ease;
  }

  .value.positive {
    --value-color: var(--color-success);
    transform: scale(1.05);
  }

  .value.negative {
    --value-color: var(--color-error);
    transform: scale(0.95);
  }

  .controls {
    justify-content: center;
  }

  .history ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    list-style: none;
    padding: 0;
  }

  .history li {
    padding: var(--space-xs) var(--space-sm);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    transition: transform 0.2s ease;
  }

  .history li:hover {
    transform: translateY(-2px);
  }
</style>
