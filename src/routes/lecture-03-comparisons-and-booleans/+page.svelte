<script lang="ts">
  const projects = [
    { slug: 'project-01-number-guesser', title: 'Number Guesser' },
    { slug: 'project-02-login-gate', title: 'Login Gate' }
  ];
</script>

<h1>Lecture 03 — Comparisons & Booleans</h1>
<p>Comparisons, booleans, and logical operators.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-03-comparisons-and-booleans/{project.slug}">{project.title}</a></li>
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
