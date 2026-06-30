<script lang="ts">
  const quotes = [
    { text: 'Code is like humor. When you have to explain it, it’s bad.', author: 'Cory House' },
    { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
    { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' }
  ];

  let index = $state(0);

  function pickRandom() {
    let next = Math.floor(Math.random() * quotes.length);
    while (next === index && quotes.length > 1) {
      next = Math.floor(Math.random() * quotes.length);
    }
    index = next;
  }
</script>

<div class="card stack">
  <h2>Random Quote</h2>

  <blockquote>
    <p class="quote">{quotes[index].text}</p>
    <cite>— {quotes[index].author}</cite>
  </blockquote>

  <button onclick={pickRandom}>New quote</button>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  blockquote {
    margin: 0;
    padding: var(--space-md);
    border-inline-start: 4px solid var(--color-primary);
    background: var(--color-surface);
    border-radius: var(--radius);
  }

  .quote {
    font-family: var(--font-accent);
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    margin-block-end: var(--space-sm);
  }

  cite {
    color: var(--color-text-muted);
    font-style: normal;
  }
</style>
