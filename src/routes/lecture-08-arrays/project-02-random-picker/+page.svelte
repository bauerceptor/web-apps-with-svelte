<script lang="ts">
let newName = $state('');
let names = $state<string[]>(['Alice', 'Bob', 'Carol']);
let winner = $state('');

function add() {
  if (newName.trim() !== '') {
    names = [...names, newName.trim()];
    newName = '';
  }
}

function pick() {
  if (names.length > 0) {
    winner = names[Math.floor(Math.random() * names.length)];
  }
}

function clear() {
  names = [];
  winner = '';
}
</script>

<div class="card stack">
  <h2>Random Picker</h2>

  <form class="row" onsubmit={(e) => { e.preventDefault(); add(); }}>
    <input type="text" bind:value={newName} placeholder="Add a name" />
    <button type="submit">Add</button>
  </form>

  <ul class="name-list">
    {#each names as name}
      <li>{name}</li>
    {/each}
  </ul>

  <div class="row">
    <button onclick={pick} disabled={names.length === 0}>Pick winner</button>
    <button onclick={clear}>Clear</button>
  </div>

  {#if winner}
    <p class="winner">Winner: {winner}</p>
  {/if}
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .name-list {
    list-style: disc;
    padding-inline-start: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .name-list li::marker {
    color: var(--color-primary);
  }

  .winner {
    font-size: 1.5rem;
    font-family: var(--font-accent);
    color: var(--color-success);
  }
</style>
