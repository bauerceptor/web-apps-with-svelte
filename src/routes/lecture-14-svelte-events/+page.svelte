<script lang="ts">
const projects = [
  { slug: 'project-01-event-playground', title: 'Event Playground' },
  { slug: 'project-02-stepper', title: 'Custom Stepper' },
];
</script>

<div class="card stack">
  <h1>Events</h1>

  <p>
    Events connect user actions to code. DOM events run on elements; component
    events in Svelte 5 are handled by passing callback props from parent to
    child.
  </p>

  <ul class="concept-list">
    <li>DOM events use attributes such as <code>onclick</code> and <code>onsubmit</code>.</li>
    <li><code>preventDefault</code> stops the browser's default action.</li>
    <li><code>stopPropagation</code> keeps an event from bubbling up.</li>
    <li>Children communicate with parents through callback props.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-14-svelte-events/{project.slug}">
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
