<script lang="ts">
const features = [
  'Store-backed notes persisted to localStorage',
  'Lifecycle effects for storage sync',
  'Transitions when notes are added or removed',
  'Custom click-outside action',
  'Snippets for reusable UI pieces',
  'Context for selected-note state',
  'Special elements: head, window, dynamic element',
];
</script>

<div class="card stack">
  <h1>Module 3 Capstone: Markdown Notes</h1>

  <p>
    This workspace ties together every topic from Module 3. Notes live in a
    shared store, the UI uses transitions and actions, and composition tools keep
    the code organized.
  </p>

  <h2>Features</h2>
  <ul class="concept-list">
    {#each features as feature}
      <li>{feature}</li>
    {/each}
  </ul>

  <a class="project-link" href="/lecture-20-module-3-capstone/project">
    Open Notes Workspace
  </a>
</div>

<style>
  .concept-list {
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
  }

  .concept-list li {
    margin-block: var(--space-sm);
  }

  .project-link {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
    text-align: center;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .project-link:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }
</style>
