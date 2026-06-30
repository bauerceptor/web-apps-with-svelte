<script lang="ts">
  let km = $state(5);
  let kg = $state(10);

  function kmToMiles(value: number): number {
    return value * 0.621371;
  }

  function kgToLbs(value: number): number {
    return value * 2.20462;
  }
</script>

<div class="card stack">
  <h2>Unit Converter</h2>

  <label class="row">
    Kilometers:
    <input type="number" bind:value={km} />
  </label>
  <p>{km} km = {kmToMiles(km).toFixed(2)} miles</p>

  <label class="row">
    Kilograms:
    <input type="number" bind:value={kg} />
  </label>
  <p>{kg} kg = {kgToLbs(kg).toFixed(2)} lbs</p>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  p {
    font-family: var(--font-mono);
    font-size: 1.125rem;
  }
</style>
