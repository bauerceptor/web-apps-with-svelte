<script lang="ts">
const projects = [
  { slug: 'project-01-live-counter', title: 'Live Counter' },
  { slug: 'project-02-stats-dashboard', title: 'Stats Dashboard' },
];
</script>

<div class="card stack">
  <h1>Runes & Reactivity</h1>

  <p>
    Svelte 5 uses runes to turn ordinary variables into reactive state. `$state`
    holds values, `$derived` computes from them, and `$effect` runs side effects
    whenever those values change.
  </p>

  <ul class="concept-list">
    <li><code>$state</code> makes a variable reactive.</li>
    <li><code>$derived</code> recalculates only when its dependencies change.</li>
    <li><code>$effect</code> is for side effects such as updating the document title.</li>
    <li>Reassign arrays and objects so Svelte can detect the change.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-11-svelte-reactivity/{project.slug}">
          {project.title}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .concept-list {
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
  }

  .concept-list li {
    margin-block: var(--space-sm);
  }

  .project-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-link {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .project-link:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }
</style>
