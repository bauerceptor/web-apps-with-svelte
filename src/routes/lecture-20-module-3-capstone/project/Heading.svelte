<script lang="ts">
let { level = 1, children } = $props();
</script>

<svelte:element this={`h${Math.min(Math.max(level, 1), 6)}`}>
  {@render children()}
</svelte:element>
