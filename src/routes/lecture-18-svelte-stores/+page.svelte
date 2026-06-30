<script lang="ts">
const projects = [
  { slug: 'project-01-theme-switcher', title: 'Theme Switcher' },
  { slug: 'project-02-notification-queue', title: 'Notification Queue' },
];
</script>

<div class="card stack">
  <h1>Stores</h1>

  <p>
    Svelte stores hold reactive state outside of components. They are a great fit
    for shared values such as themes, shopping carts, or notification queues.
  </p>

  <ul class="concept-list">
    <li>
      <code>writable(initialValue)</code> creates a store you can update with
      <code>.set()</code> or <code>.update()</code>.
    </li>
    <li>
      <code>readable(initialValue, start)</code> creates a read-only store that
      can push values from outside, such as a clock or geolocation stream.
    </li>
    <li>
      <code>derived(store, fn)</code> creates a new store that updates whenever
      its source stores change.
    </li>
    <li>
      Prefix a store name with <code>$</code> inside a component to
      auto-subscribe: <code>&lbrace;$storeName&rbrace;</code>.
    </li>
  </ul>

  <h2>Projects</h2>
  <ul class="project-list">
    {#each projects as project}
      <li>
        <a class="project-link" href="/lecture-18-svelte-stores/{project.slug}">
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
