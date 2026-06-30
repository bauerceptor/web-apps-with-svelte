<script lang="ts">
let score = $state(85);

function grade(value: number): string {
  if (value >= 90) return 'A';
  if (value >= 80) return 'B';
  if (value >= 70) return 'C';
  if (value >= 60) return 'D';
  return 'F';
}
</script>

<div class="card stack">
  <h2>Grade Calculator</h2>

  <label class="row">
    Score:
    <input type="number" bind:value={score} min="0" max="100" />
  </label>

  <p class="grade">Grade: {grade(score)}</p>

  {#if score >= 60}
    <p class="pass">You passed.</p>
  {:else}
    <p class="fail">You did not pass.</p>
  {/if}
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .grade {
    font-size: 1.5rem;
    font-family: var(--font-mono);
  }

  .pass {
    color: var(--color-success);
  }

  .fail {
    color: var(--color-error);
  }
</style>
