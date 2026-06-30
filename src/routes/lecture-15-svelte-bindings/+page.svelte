<script lang="ts">
const projects = [
  { slug: 'project-01-settings-form', title: 'Settings Form' },
  { slug: 'project-02-survey-poll', title: 'Survey Poll' },
];
</script>

<div class="card stack">
  <h1>Bindings</h1>

  <p>
    Bindings connect state to the DOM so that changes flow in both directions.
    They remove the boilerplate of manually listening to input events and
    updating values.
  </p>

  <ul class="concept-list">
    <li><code>bind:value</code> syncs inputs, textareas, and selects.</li>
    <li><code>bind:checked</code> syncs a single checkbox.</li>
    <li><code>bind:group</code> syncs radio buttons or checkbox groups.</li>
    <li><code>bind:this</code> stores a reference to a DOM element.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-15-svelte-bindings/{project.slug}">
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
