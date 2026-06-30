<script lang="ts">
  let count = $state(0);

  function increment() {
    count = count + 1;
  }

  function decrement() {
    count = count - 1;
  }

  function reset() {
    count = 0;
  }
</script>

<div class="card stack">
  <h2>Counter</h2>

  <p class="count">{count}</p>

  <div class="row">
    <button onclick={decrement}>-</button>
    <button onclick={increment}>+</button>
    <button onclick={reset}>Reset</button>
  </div>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .count {
    font-family: var(--font-mono);
    font-size: clamp(2rem, 5vw, 4rem);
    text-align: center;
  }
</style>
