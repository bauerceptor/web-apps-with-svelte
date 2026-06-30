<script lang="ts">
  let total = $state(75);

  // Discount percentage based on cart total.
  let discount = $derived(total >= 100 ? 20 : total >= 50 ? 10 : 0);
  let final = $derived(total - (total * discount) / 100);
</script>

<div class="card stack">
  <h2>Discount Eligibility</h2>

  <label class="row">
    Cart total:
    <input type="number" bind:value={total} min="0" />
  </label>

  {#if discount > 0}
    <p class="discount">You qualify for {discount}% off.</p>
    <p class="final">Final total: ${final.toFixed(2)}</p>
  {:else}
    <p class="no-discount">Add ${(50 - total).toFixed(2)} more for 10% off.</p>
  {/if}
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .discount {
    color: var(--color-success);
    font-weight: 700;
  }

  .final {
    font-size: 1.25rem;
  }

  .no-discount {
    color: var(--color-text-muted);
  }
</style>
