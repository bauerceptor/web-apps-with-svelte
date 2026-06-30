<script lang="ts">
  const projects = [
    { slug: 'project-01-temperature-converter', title: 'Temperature Converter' },
    { slug: 'project-02-bmi-calculator', title: 'BMI Calculator' }
  ];
</script>

<h1>Lecture 02 — Numbers, Strings & Operators</h1>
<p>Numbers, strings, arithmetic, and type conversion.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-02-types-and-operators/{project.slug}">{project.title}</a></li>
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
