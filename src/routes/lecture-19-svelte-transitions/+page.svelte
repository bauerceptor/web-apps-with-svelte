<script lang="ts">
const projects = [
  { slug: 'project-01-animated-task-list', title: 'Animated Task List' },
  { slug: 'project-02-modal-actions', title: 'Modal with Actions' },
];
</script>

<div class="card stack">
  <h1>Transitions & Actions</h1>

  <p>
    Motion and reusable DOM behavior help interfaces feel polished. Svelte makes
    it easy to animate elements entering and leaving the DOM, and to package
    reusable DOM logic as actions.
  </p>

  <ul class="concept-list">
    <li><code>transition:</code>, <code>in:</code>, and <code>out:</code> directives.</li>
    <li>Built-in transitions: <code>fade</code>, <code>fly</code>, <code>slide</code>, <code>scale</code>, <code>blur</code>.</li>
    <li><code>animate:flip</code> for smooth list reordering.</li>
    <li>Custom actions with <code>use:actionName</code>.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-19-svelte-transitions/{project.slug}">
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
