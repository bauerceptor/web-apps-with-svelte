<script lang="ts">
const projects = [
  { slug: 'project-01-async-quote', title: 'Async Quote' },
  { slug: 'project-02-keyed-todo', title: 'Keyed Todo List' },
];
</script>

<div class="card stack">
  <h1>Logic Blocks</h1>

  <p>
    Logic blocks decide what Svelte renders. {'{#if}'} shows or hides content,
    {'{#each}'} loops over data, and {'{#await}'} handles promises. A stable key on
    {'{#each}'} makes sure each list item keeps its own state when the order
    changes.
  </p>

  <ul class="concept-list">
    <li><code>{'{#if}'}</code> renders content conditionally.</li>
    <li><code>{'{#each}'}</code> renders a block for every item in a list.</li>
    <li>A stable key tells Svelte which DOM element belongs to which item.</li>
    <li><code>{'{#await}'}</code> handles loading, success, and error states.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-13-svelte-logic/{project.slug}">
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
