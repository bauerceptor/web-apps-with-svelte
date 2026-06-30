<script lang="ts">
const projects = [
  { slug: 'project-01-card-gallery', title: 'Card Gallery' },
  { slug: 'project-02-profile-builder', title: 'Profile Builder' },
];
</script>

<div class="card stack">
  <h1>Props</h1>

  <p>
    Props let components receive data from their parent. In Svelte 5, a child
    component declares props with the `$props` rune. Props are reactive: when
    the parent state changes, the child updates automatically.
  </p>

  <ul class="concept-list">
    <li><code>$props()</code> receives values passed from a parent.</li>
    <li>Default values make props optional.</li>
    <li>Spreading props keeps parent markup short.</li>
    <li>Updating parent state flows down to child components.</li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-12-svelte-props/{project.slug}">
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
