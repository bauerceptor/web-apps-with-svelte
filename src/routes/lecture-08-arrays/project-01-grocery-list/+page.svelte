<script lang="ts">
type Item = {
  name: string;
  bought: boolean;
};

let newItem = $state('');
let items = $state<Item[]>([
  { name: 'Milk', bought: false },
  { name: 'Bread', bought: false },
]);

function add() {
  if (newItem.trim() !== '') {
    items = [...items, { name: newItem.trim(), bought: false }];
    newItem = '';
  }
}

function toggle(index: number) {
  items = items.map((item, i) => (i === index ? { ...item, bought: !item.bought } : item));
}

function remove(index: number) {
  items = items.filter((_, i) => i !== index);
}
</script>

<div class="card stack">
  <h2>Grocery List</h2>

  <form class="row" onsubmit={(e) => { e.preventDefault(); add(); }}>
    <input type="text" bind:value={newItem} placeholder="Add an item" />
    <button type="submit">Add</button>
  </form>

  <ul class="grocery-list">
    {#each items as item, index}
      <li class="item" class:bought={item.bought}>
        <button class="toggle" onclick={() => toggle(index)}>
          {item.bought ? '✓' : '○'}
        </button>
        <span>{item.name}</span>
        <button class="remove" onclick={() => remove(index)}>Remove</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .grocery-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  .item:nth-child(even) {
    background: color-mix(in oklab, var(--color-surface) 95%, black);
  }

  .item.bought span {
    text-decoration: line-through;
    color: var(--color-text-muted);
  }

  .toggle,
  .remove {
    padding: var(--space-xs) var(--space-sm);
    font-size: 0.875rem;
  }

  .toggle {
    background: transparent;
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .remove {
    margin-inline-start: auto;
  }
</style>
