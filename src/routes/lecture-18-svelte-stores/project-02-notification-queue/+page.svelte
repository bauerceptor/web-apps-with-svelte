<script lang="ts">
import { notifications, count } from './notifications';
import type { NotificationType } from './notifications';

const types: NotificationType[] = ['info', 'success', 'warning', 'error'];

let message = $state('');
let type = $state<NotificationType>('info');

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();

  const text = message.trim();
  if (!text) return;

  notifications.add(text, type);
  message = '';
  type = 'info';
}
</script>

<div class="card stack queue">
  <h2>Notification Queue</h2>

  <p class="count">
    Active notifications: <strong>{$count}</strong>
  </p>

  <form class="row" onsubmit={handleSubmit}>
    <input
      bind:value={message}
      placeholder="Enter a message..."
      aria-label="Message"
    />

    <select bind:value={type} aria-label="Type">
      {#each types as option}
        <option value={option}>{option}</option>
      {/each}
    </select>

    <button type="submit">Notify</button>
  </form>

  <ul class="toast-list">
    {#each $notifications as notification (notification.id)}
      <li
        class="toast"
        class:info={notification.type === 'info'}
        class:success={notification.type === 'success'}
        class:warning={notification.type === 'warning'}
        class:error={notification.type === 'error'}
        role="status"
      >
        <span class="message">{notification.message}</span>
        <button
          class="dismiss"
          onclick={() => notifications.dismiss(notification.id)}
          aria-label="Dismiss"
        >
          ×
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  @layer base, components, utilities;

  @layer components {
    .count {
      color: var(--color-text-muted);
    }

    .toast-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      border-inline-start-width: 4px;
      border-inline-start-color: var(--color-primary);
    }

    .toast.success {
      border-inline-start-color: var(--color-success);
    }

    .toast.warning {
      border-inline-start-color: #f59e0b;
    }

    .toast.error {
      border-inline-start-color: var(--color-error);
    }

    .message {
      flex: 1;
    }

    .dismiss {
      padding: var(--space-xs) var(--space-sm);
      background: transparent;
      color: var(--color-text-muted);
      border-color: transparent;
      font-size: 1.25rem;
      line-height: 1;
    }

    .dismiss:hover {
      color: var(--color-text);
      background: var(--color-bg);
    }
  }
</style>
