<script lang="ts">
const projects = [
  { slug: 'project-01-auto-save-notepad', title: 'Auto-Save Notepad' },
  { slug: 'project-02-window-status', title: 'Window Status' },
];
</script>

<div class="card stack">
  <h1>Lifecycle</h1>

  <p>
    Svelte components go through a lifecycle: they are created, updated, and
    eventually destroyed. Runes let you tap into that lifecycle with effects
    that run when state changes, and cleanup functions that run when the effect
    re-runs or the component is destroyed.
  </p>

  <ul class="concept-list">
    <li><code>$effect</code> runs side effects whenever its dependencies change.</li>
    <li>Effects can read and write state, but avoid creating infinite loops.</li>
    <li>Returning a function from <code>$effect</code> cleans up the previous run.</li>
    <li>Cleanup is also called when the component is destroyed.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-17-svelte-lifecycle/{project.slug}">
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
