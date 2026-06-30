<script lang="ts">
let { status, message = '' } = $props<{
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}>();
</script>

<div class="status" class:loading={status === 'loading'} class:error={status === 'error'} class:success={status === 'success'} role="status" aria-live="polite">
  {#if status === 'idle'}
    <span>Enter ingredients below to generate a recipe.</span>
  {:else if status === 'loading'}
    <span class="spinner" aria-hidden="true"></span>
    <span>Asking the chef…</span>
  {:else if status === 'success'}
    <span>Here is your recipe!</span>
  {:else if status === 'error'}
    <span>{message || 'Something went wrong. Please try again.'}</span>
  {/if}
</div>

<style>
  .status {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text-muted);
  }

  .status.loading {
    color: var(--color-text);
  }

  .status.success {
    color: var(--color-success);
  }

  .status.error {
    color: var(--color-error);
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
