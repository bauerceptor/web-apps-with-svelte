<script lang="ts">
type Todo = {
  id: number;
  text: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
};

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
};

let { todo, onToggle, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: Props = $props();

// Internal state that should survive when the list is reordered.
let editing = $state(false);
let draft = $state(todo.text);

function save() {
  editing = false;
  todo.text = draft;
}
</script>

<li
  class="todo-item"
  class:done={todo.done}
  style="--todo-priority: {todo.priority === 'high' ? 'var(--color-error)' : todo.priority === 'medium' ? 'var(--color-primary)' : 'var(--color-success)'}"
>
  <div class="row content">
    <input type="checkbox" checked={todo.done} onchange={onToggle} />

    {#if editing}
      <input type="text" bind:value={draft} />
      <button onclick={save}>Save</button>
    {:else}
      <span class="text" onclick={() => (editing = true)}>{todo.text}</span>
      <button onclick={() => (editing = true)}>Edit</button>
    {/if}
  </div>

  <div class="row actions">
    <button disabled={isFirst} onclick={onMoveUp}>Up</button>
    <button disabled={isLast} onclick={onMoveDown}>Down</button>
    <button onclick={onDelete}>Delete</button>
  </div>
</li>

<style>
  .todo-item {
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-left: 4px solid var(--todo-priority);
    border-radius: var(--radius);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-sm);
  }

  .todo-item.done .text {
    text-decoration: line-through;
    color: var(--color-text-muted);
  }

  .text {
    cursor: pointer;
    flex: 1;
  }
</style>
