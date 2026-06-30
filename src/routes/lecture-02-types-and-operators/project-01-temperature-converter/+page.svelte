<script lang="ts">
// Start with a comfortable room temperature.
let celsius = $state(20);

// Derive Fahrenheit from the current Celsius value.
let fahrenheit = $derived((celsius * 9) / 5 + 32);

// Template strings let us embed values inside readable text.
let summary = $derived(`${celsius}°C is ${fahrenheit.toFixed(1)}°F`);
</script>

<div class="card stack">
  <h2>Temperature Converter</h2>

  <label class="row">
    Celsius:
    <input type="number" bind:value={celsius} />
  </label>

  <p class="result">{summary}</p>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .result {
    font-family: var(--font-mono);
    font-size: 1.125rem;
    color: var(--color-primary);
  }
</style>
