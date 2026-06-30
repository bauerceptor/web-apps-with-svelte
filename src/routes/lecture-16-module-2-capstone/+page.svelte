<script lang="ts">
import TaskCard from './TaskCard.svelte';

type Priority = 'low' | 'medium' | 'high';

type Task = {
  id: number;
  title: string;
  priority: Priority;
  done: boolean;
};

type Filter = 'all' | 'active' | 'completed';

let tasks = $state<Task[]>([
  { id: 1, title: 'Review runes', priority: 'high', done: false },
  { id: 2, title: 'Build a card component', priority: 'medium', done: true },
  { id: 3, title: 'Practice keyed each blocks', priority: 'low', done: false },
]);

let newTitle = $state('');
let newPriority = $state<Priority>('medium');
let filter = $state<Filter>('all');

let total = $derived(tasks.length);
let completed = $derived(tasks.filter((task) => task.done).length);
let pending = $derived(total - completed);

let filteredTasks = $derived(
  tasks.filter((task) => {
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
    return true;
  }),
);

function addTask(event: Event) {
  event.preventDefault();
  if (newTitle.trim() === '') return;

  tasks = [
    ...tasks,
    {
      id: Date.now(),
      title: newTitle.trim(),
      priority: newPriority,
      done: false,
    },
  ];
  newTitle = '';
}

function toggleTask(id: number) {
  tasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
}

function deleteTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
}

function saveTaskTitle(id: number, title: string) {
  if (title === '') return;
  tasks = tasks.map((task) => (task.id === id ? { ...task, title } : task));
}
</script>

<div class="card stack dashboard">
  <h2>Task Dashboard</h2>

  <div class="stats">
    <div class="stat">
      <span class="stat-label">Total</span>
      <span class="stat-value">{total}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Pending</span>
      <span class="stat-value">{pending}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Completed</span>
      <span class="stat-value">{completed}</span>
    </div>
  </div>

  <form class="row add-form" onsubmit={addTask}>
    <input type="text" bind:value={newTitle} placeholder="Add a task" />
    <select bind:value={newPriority}>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button type="submit">Add task</button>
  </form>

  <div class="row filters">
    {#each ['all', 'active', 'completed'] as option}
      <button class="filter-button" class:active={filter === option} onclick={() => (filter = option as Filter)}>
        {option}
      </button>
    {/each}
  </div>

  {#if tasks.length === 0}
    <p class="empty">No tasks yet. Add one above to get started.</p>
  {:else}
    <ul class="task-list">
      {#each filteredTasks as task (task.id)}
        <TaskCard
          {task}
          onToggle={() => toggleTask(task.id)}
          onDelete={() => deleteTask(task.id)}
          onSave={(title) => saveTaskTitle(task.id, title)}
        />
      {:else}
        <li class="empty">No tasks match this filter.</li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  @layer base, components, utilities;

  @layer base {
    :is(.dashboard h2, .dashboard h3) {
      font-family: var(--font-heading);
    }
  }

  @layer components {
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
      gap: var(--space-md);
    }

    .stat {
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      transition: transform 0.2s ease;
    }

    .stat:hover {
      transform: translateY(-2px);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      font-family: var(--font-mono);
    }

    .add-form {
      gap: var(--space-sm);
    }

    .filters {
      gap: var(--space-sm);
    }

    .filter-button {
      background: var(--color-surface);
      color: var(--color-text);
      border-color: var(--color-border);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
    }

    .filter-button.active {
      background: var(--color-primary);
      color: var(--color-primary-text);
      border-color: var(--color-primary);
    }

    .task-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .empty {
      color: var(--color-text-muted);
    }
  }

  @layer utilities {
    .dashboard .row {
      flex-wrap: wrap;
    }
  }
</style>
