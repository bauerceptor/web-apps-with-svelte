<script lang="ts">
import Stepper from './Stepper.svelte';

let value = $state(0);

function onIncrement() {
  value = value + 1;
}

function onDecrement() {
  value = value - 1;
}

function onReset() {
  value = 0;
}
</script>

<div class="card stack">
  <h2>Custom Stepper</h2>

  <p>
    The stepper below is a child component. It does not own the count; it only
    displays the value and calls the functions the parent passed in.
  </p>

  <Stepper {value} {onIncrement} {onDecrement} {onReset} />

  <p class="result">Parent sees: <strong>{value}</strong></p>
</div>

<style>
  .result {
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }
</style>
