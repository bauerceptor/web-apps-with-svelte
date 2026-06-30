<script lang="ts">
let { level = 1, children } = $props();
const tag = `h${Math.min(Math.max(level, 1), 6)}`;
</script>

<svelte:element this={tag}>
  {@render children()}
</svelte:element>
