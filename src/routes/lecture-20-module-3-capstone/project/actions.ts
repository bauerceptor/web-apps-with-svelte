import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
  let onClickOutside = callback;

  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      onClickOutside?.();
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
    update(newCallback) {
      onClickOutside = newCallback;
    },
  };
};
