<script lang="ts">
  const projects = [
    { slug: 'project-01-multiplication-table', title: 'Multiplication Table' },
    { slug: 'project-02-todo-list', title: 'Todo List' }
  ];
</script>

<h1>Lecture 05 — Loops</h1>
<p>Rendering lists with {'{#each}'}.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-05-loops/{project.slug}">{project.title}</a></li>
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
