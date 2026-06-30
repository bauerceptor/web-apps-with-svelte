<script lang="ts">
const projects = [
  { slug: 'project-01-greeter', title: 'Greeter' },
  { slug: 'project-02-tip-calculator', title: 'Tip Calculator' },
];
</script>

<h1>Lecture 01 — Input / Output & Variables</h1>
<p>This lecture introduces variables and the simplest form of input and output.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-01-io/{project.slug}">{project.title}</a></li>
  {/each}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-list a {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .project-list a:hover {
    border-color: var(--color-primary);
  }
</style>
