<script lang="ts">
import Card from './Card.svelte';

type CardData = {
  title: string;
  description: string;
  highlighted?: boolean;
};

let cards = $state<CardData[]>([
  { title: 'Reactivity', description: 'Turn values into reactive state with runes.' },
  { title: 'Props', description: 'Send data down into child components.' },
  { title: 'Events', description: 'Send actions back up with callback props.', highlighted: true },
  { title: 'Bindings', description: 'Keep inputs and state in sync with less boilerplate.' },
]);

function toggleHighlight(index: number) {
  cards = cards.map((card, i) => (i === index ? { ...card, highlighted: !card.highlighted } : card));
}
</script>

<div class="card stack gallery">
  <h2>Card Gallery</h2>

  <div class="grid">
    {#each cards as card, index}
      <div class="card-wrapper" onclick={() => toggleHighlight(index)} role="button" tabindex="0">
        <Card {...card} />
      </div>
    {/each}
  </div>
</div>

<style>
  /* :where keeps the selector specificity low while grouping several elements. */
  :where(.gallery) :is(h2, h3) {
    font-family: var(--font-heading);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: var(--space-md);
  }

  .card-wrapper {
    cursor: pointer;
    text-align: start;
  }

  .card-wrapper:hover :global(.card) {
    border-color: var(--color-primary);
  }
</style>
