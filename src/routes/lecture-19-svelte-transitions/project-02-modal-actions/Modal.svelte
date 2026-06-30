<script lang="ts">
import { fade, fly } from 'svelte/transition';
import { clickOutside, focusTrap } from './actions';

let { open = $bindable(false), title = 'Modal', children } = $props();
</script>

{#if open}
  <div class="backdrop" transition:fade={{ duration: 200 }}>
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      use:clickOutside={() => (open = false)}
      use:focusTrap
      transition:fly={{ y: -20, duration: 250 }}
    >
      <header class="modal-header">
        <h2 id="modal-title">{title}</h2>
        <button onclick={() => (open = false)} aria-label="Close">×</button>
      </header>
      <div class="modal-body">
        {@render children()}
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    padding: var(--space-md);
    z-index: 100;
  }

  .modal {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    max-width: 40ch;
    width: 100%;
    padding: var(--space-lg);
    box-shadow: var(--shadow);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: var(--space-md);
  }

  .modal-header h2 {
    margin: 0;
  }

  .modal-header button {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-text-muted);
  }
</style>
