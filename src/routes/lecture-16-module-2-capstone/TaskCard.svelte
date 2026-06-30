<script lang="ts">
type Task = {
  id: number;
  title: string;
  priority: 'low' | 'medium' | 'high';
  done: boolean;
};

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onSave: (title: string) => void;
};

let { task, onToggle, onDelete, onSave }: Props = $props();

// Editing state lives inside the card and survives reordering thanks to keyed each.
let editing = $state(false);
let draft = $state(task.title);

function startEdit() {
  editing = true;
  draft = task.title;
}

function save() {
  editing = false;
  onSave(draft.trim());
}
</script>

<li
  class="task-card"
  class:done={task.done}
  style="--task-priority: {task.priority === 'high'
    ? 'var(--color-error)'
    : task.priority === 'medium'
      ? 'var(--color-primary)'
      : 'var(--color-success)'}"
>
  <input type="checkbox" checked={task.done} onchange={onToggle} />

  {#if editing}
    <input type="text" bind:value={draft} />
    <button onclick={save}>Save</button>
  {:else}
    <span class="title">{task.title}</span>
    <span class="priority">{task.priority}</span>
    <button onclick={startEdit}>Edit</button>
  {/if}

  <button onclick={onDelete}>Delete</button>
</li>

<style>
  .task-card {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-left: 4px solid var(--task-priority);
    border-radius: var(--radius);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease;
  }

  .task-card:hover {
    transform: translateX(4px);
    border-color: var(--color-primary);
  }

  .task-card.done .title {
    text-decoration: line-through;
    color: var(--color-text-muted);
  }

  .title {
    flex: 1;
  }

  .priority {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--task-priority);
    font-weight: 700;
  }
</style>
