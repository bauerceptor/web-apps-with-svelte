<script lang="ts">
type Quote = {
  content: string;
  author: string;
};

const fallbackQuotes: Quote[] = [
  { content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { content: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { content: 'Code is like humor. When you have to explain it, it is bad.', author: 'Cory House' },
];

async function fetchQuote(): Promise<Quote> {
  try {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return { content: data.content, author: data.author };
  } catch {
    // If the API fails, return a random quote from the static fallback list.
    const index = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[index];
  }
}

let quotePromise = $state<Promise<Quote>>(fetchQuote());

function refresh() {
  quotePromise = fetchQuote();
}
</script>

<div class="card stack quote-app">
  <h2>Async Quote</h2>

  <button onclick={refresh}>New quote</button>

  <div class="quote-box">
    {#await quotePromise}
      <p class="status">Loading quote...</p>
    {:then quote}
      <blockquote class="quote" style="--quote-accent: {quote.content.length > 80 ? 'var(--color-success)' : 'var(--color-primary)'}">
        <p class="content">{quote.content}</p>
        <footer class="author">— {quote.author}</footer>
      </blockquote>
    {/await}
  </div>
</div>

<style>
  .quote-box {
    min-height: 8rem;
  }

  .status {
    color: var(--color-text-muted);
    font-style: italic;
  }

  .quote {
    margin: 0;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-left: 4px solid var(--quote-accent);
    border-radius: var(--radius);
  }

  .content {
    font-size: 1.25rem;
    font-family: var(--font-accent);
    margin-block-end: var(--space-sm);
  }

  .author {
    color: var(--color-text-muted);
  }
</style>
