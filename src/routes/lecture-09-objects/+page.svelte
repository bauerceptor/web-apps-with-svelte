<script lang="ts">
const projects = [
  { slug: 'project-01-profile-card', title: 'Profile Card' },
  { slug: 'project-02-product-list', title: 'Product List' },
];
</script>

<h1>Lecture 09 — Objects</h1>
<p>Grouping data and rendering arrays of objects.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-09-objects/{project.slug}">{project.title}</a></li>
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
