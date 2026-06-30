<script lang="ts">
const lectures = [
  { num: 1, slug: 'lecture-01-io', title: 'Input / Output & Variables' },
  { num: 2, slug: 'lecture-02-types-and-operators', title: 'Numbers, Strings & Operators' },
  { num: 3, slug: 'lecture-03-comparisons-and-booleans', title: 'Comparisons & Booleans' },
  { num: 4, slug: 'lecture-04-if-else', title: 'If / Else' },
  { num: 5, slug: 'lecture-05-loops', title: 'Loops' },
  { num: 6, slug: 'lecture-06-functions', title: 'Functions' },
  { num: 7, slug: 'lecture-07-events', title: 'Events' },
  { num: 8, slug: 'lecture-08-arrays', title: 'Arrays' },
  { num: 9, slug: 'lecture-09-objects', title: 'Objects' },
  { num: 10, slug: 'lecture-10-capstone', title: 'Capstone: Flashcard Quiz' },
];
</script>

<h1>Web Apps with Svelte</h1>
<p class="intro">A beginner-first course that teaches programming basics through Svelte.</p>

<ol class="lecture-list">
  {#each lectures as lecture}
    <li>
      <a href="/{lecture.slug}">
        <span class="number">{lecture.num}</span>
        {lecture.title}
      </a>
    </li>
  {/each}
</ol>

<style>
  .intro {
    color: var(--color-text-muted);
    margin-block: var(--space-sm) var(--space-lg);
  }

  .lecture-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .lecture-list li a {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
  }

  .lecture-list li a:hover {
    border-color: var(--color-primary);
  }

  .number {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    background: var(--color-primary);
    color: var(--color-primary-text);
    border-radius: 50%;
    font-weight: 700;
    font-size: 0.875rem;
  }
</style>
