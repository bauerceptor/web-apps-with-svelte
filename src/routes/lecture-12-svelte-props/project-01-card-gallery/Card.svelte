<script lang="ts">
type Props = {
  title: string;
  description: string;
  highlighted?: boolean;
};

let { title, description, highlighted = false }: Props = $props();
</script>

<article class="card" class:highlighted>
  <h3>{title}</h3>
  <p>{description}</p>
</article>

<style>
  .card {
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  .card.highlighted {
    border-color: var(--color-primary);
    background: var(--color-bg);
  }
</style>
