<script lang="ts">
  import '$lib/styles/reset.css';
  import '$lib/styles/theme.css';
  import '$lib/styles/utils.css';

  let { children } = $props();
</script>

<nav class="nav">
  <a class="nav-link" href="/">Web Apps with Svelte</a>
</nav>

<div class="container">
  {@render children()}
</div>

<style>
  .nav {
    padding: var(--space-md);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  .nav-link {
    color: var(--color-text);
    text-decoration: none;
    font-weight: 600;
  }

  .container {
    max-width: 70ch;
    margin-inline: auto;
    padding: var(--space-xl) var(--space-md);
  }
</style>
