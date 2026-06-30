<script lang="ts">
  let heightCm = $state(170);
  let weightKg = $state(70);

  // Convert height to meters before using it in the formula.
  let bmi = $derived(weightKg / Math.pow(heightCm / 100, 2));

  function category(value: number): string {
    if (value < 18.5) return 'Underweight';
    if (value < 25) return 'Healthy weight';
    if (value < 30) return 'Overweight';
    return 'Obese';
  }
</script>

<div class="card stack">
  <h2>BMI Calculator</h2>

  <label class="row">
    Height (cm):
    <input type="number" bind:value={heightCm} min="1" />
  </label>

  <label class="row">
    Weight (kg):
    <input type="number" bind:value={weightKg} min="1" />
  </label>

  <div class="result">
    <p>BMI: {bmi.toFixed(1)}</p>
    <p>Category: {category(bmi)}</p>
  </div>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .result p {
    font-size: 1.125rem;
    margin-block: var(--space-xs);
  }

  .result p:last-child {
    color: var(--color-primary);
  }
</style>
