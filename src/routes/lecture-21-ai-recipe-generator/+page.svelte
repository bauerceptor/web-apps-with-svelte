<script lang="ts">
const features = [
  'Calls the Groq API with fetch',
  'Server-side API route keeps the key secret',
  'Loading, error, and success states',
  'Mock recipe fallback when no API key is set',
];
</script>

<div class="card stack">
  <h1>Capstone: Smart Recipe Generator</h1>

  <p>
    The final project brings together everything from the course. You enter
    ingredients, the app asks an AI chef for a recipe, and the result is shown
    in a clean card.
  </p>

  <h2>Features</h2>
  <ul class="concept-list">
    {#each features as feature}
      <li>{feature}</li>
    {/each}
  </ul>

  <a class="project-link" href="/lecture-21-ai-recipe-generator/project">
    Open Recipe Generator
  </a>
</div>

<style>
  .concept-list {
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
  }

  .concept-list li {
    margin-block: var(--space-sm);
  }

  .project-link {
    display: block;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-text);
    text-align: center;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .project-link:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }
</style>
