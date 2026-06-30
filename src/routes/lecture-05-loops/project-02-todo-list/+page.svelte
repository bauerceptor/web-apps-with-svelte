<script lang="ts">
let newTask = $state('');
let tasks = $state<string[]>(['Learn Svelte', 'Build a project']);

function add() {
  if (newTask.trim() !== '') {
    tasks = [...tasks, newTask.trim()];
    newTask = '';
  }
}

function remove(index: number) {
  tasks = tasks.filter((_, i) => i !== index);
}
</script>

<div class="card stack">
  <h2>Todo List</h2>

  <form class="row" onsubmit={(e) => { e.preventDefault(); add(); }}>
    <input type="text" bind:value={newTask} placeholder="Add a task" />
    <button type="submit">Add</button>
  </form>

  <ul class="task-list">
    {#each tasks as task, index}
      <li class="task">
        <span>{task}</span>
        <button onclick={() => remove(index)}>Remove</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .task-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .task {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  .task button {
    padding: var(--space-xs) var(--space-sm);
    font-size: 0.875rem;
  }
</style>
