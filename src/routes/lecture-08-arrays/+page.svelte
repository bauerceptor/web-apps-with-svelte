<script lang="ts">
const projects = [
  { slug: 'project-01-grocery-list', title: 'Grocery List' },
  { slug: 'project-02-random-picker', title: 'Random Picker' },
];
</script>

<h1>Lecture 08 — Arrays</h1>
<p>Working with ordered lists of values.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-08-arrays/{project.slug}">{project.title}</a></li>
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
