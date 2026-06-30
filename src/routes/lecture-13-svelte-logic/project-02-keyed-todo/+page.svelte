<script lang="ts">
import TodoItem from './TodoItem.svelte';

type Priority = 'low' | 'medium' | 'high';

type Todo = {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
};

let todos = $state<Todo[]>([
  { id: 1, text: 'Learn keyed each blocks', done: false, priority: 'high' },
  { id: 2, text: 'Build a Svelte component', done: false, priority: 'medium' },
  { id: 3, text: 'Style with custom properties', done: false, priority: 'low' },
]);

let nextId = $derived(todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1);
let newText = $state('');
let newPriority = $state<Priority>('medium');

function addTodo() {
  if (newText.trim() === '') return;
  todos = [...todos, { id: nextId, text: newText.trim(), done: false, priority: newPriority }];
  newText = '';
}

function toggleTodo(id: number) {
  todos = todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
}

function deleteTodo(id: number) {
  todos = todos.filter((todo) => todo.id !== id);
}

function moveUp(id: number) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index <= 0) return;
  const next = [...todos];
  [next[index - 1], next[index]] = [next[index], next[index - 1]];
  todos = next;
}

function moveDown(id: number) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1 || index >= todos.length - 1) return;
  const next = [...todos];
  [next[index], next[index + 1]] = [next[index + 1], next[index]];
  todos = next;
}
</script>

<div class="card stack todo-app">
  <h2>Keyed Todo List</h2>

  <div class="row add-form">
    <input type="text" bind:value={newText} placeholder="New task" />
    <select bind:value={newPriority}>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button onclick={addTodo}>Add</button>
  </div>

  {#if todos.length === 0}
    <p class="empty">No todos yet. Add one above.</p>
  {:else}
    <ul class="todo-list">
      {#each todos as todo (todo.id)}
        <TodoItem
          {todo}
          isFirst={todo.id === todos[0].id}
          isLast={todo.id === todos[todos.length - 1].id}
          onToggle={() => toggleTodo(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
          onMoveUp={() => moveUp(todo.id)}
          onMoveDown={() => moveDown(todo.id)}
        />
      {/each}
    </ul>
  {/if}
</div>

<style>
  .add-form {
    gap: var(--space-sm);
  }

  .empty {
    color: var(--color-text-muted);
  }

  .todo-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
</style>
