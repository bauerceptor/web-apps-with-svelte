<script lang="ts">
let { query = $bindable('') } = $props();
</script>

<div class="search">
  <input type="search" placeholder="Search notes…" bind:value={query} />
</div>

<style>
  .search input {
    width: 100%;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-family: var(--font-body);
  }
</style>
