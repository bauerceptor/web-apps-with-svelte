<script lang="ts">
const projects = [
  { slug: 'project-01-grade-calculator', title: 'Grade Calculator' },
  { slug: 'project-02-discount-eligibility', title: 'Discount Eligibility' },
];
</script>

<h1>Lecture 04 — If / Else</h1>
<p>Branching logic and conditional rendering.</p>

<ul class="project-list">
  {#each projects as project}
    <li><a href="/lecture-04-if-else/{project.slug}">{project.title}</a></li>
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
