<script lang="ts">
import { fly, fade } from 'svelte/transition';
import { flip } from 'svelte/animate';

type Task = { id: number; text: string };

let tasks = $state<Task[]>([
  { id: 1, text: 'Learn transitions' },
  { id: 2, text: 'Try animate:flip' },
]);

let newTask = $state('');

function addTask(event: Event) {
  event.preventDefault();
  if (newTask.trim() === '') return;
  tasks = [...tasks, { id: Date.now(), text: newTask.trim() }];
  newTask = '';
}

function removeTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
}

function shuffle() {
  tasks = tasks.slice().sort(() => Math.random() - 0.5);
}
</script>

<div class="card stack">
  <h2>Animated Task List</h2>

  <form class="row" onsubmit={addTask}>
    <input type="text" bind:value={newTask} placeholder="Add a task" />
    <button type="submit">Add</button>
    <button type="button" onclick={shuffle}>Shuffle</button>
  </form>

  <ul class="task-list">
    {#each tasks as task (task.id)}
      <li
        class="task"
        in:fly={{ y: 20, duration: 250 }}
        out:fade={{ duration: 200 }}
        animate:flip={{ duration: 250 }}
      >
        <span>{task.text}</span>
        <button onclick={() => removeTask(task.id)}>Remove</button>
      </li>
    {:else}
      <li class="empty">No tasks yet.</li>
    {/each}
  </ul>
</div>

<style>
  .row {
    gap: var(--space-sm);
    flex-wrap: wrap;
  }

  input {
    flex: 1;
    min-width: 12rem;
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
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  .task button {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    cursor: pointer;
  }

  .empty {
    color: var(--color-text-muted);
  }
</style>
