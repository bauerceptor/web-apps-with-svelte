import { derived, writable } from 'svelte/store';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

const AUTO_DISMISS_MS = 4000;

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createNotifications() {
  const { subscribe, update } = writable<Notification[]>([]);

  function dismiss(id: string) {
    update((list) => list.filter((notification) => notification.id !== id));
  }

  function add(message: string, type: NotificationType = 'info') {
    const id = createId();

    update((list) => [...list, { id, message, type }]);

    if (typeof window !== 'undefined') {
      setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
    }
  }

  return { subscribe, add, dismiss };
}

export const notifications = createNotifications();

export const count = derived(notifications, ($notifications) => $notifications.length);
