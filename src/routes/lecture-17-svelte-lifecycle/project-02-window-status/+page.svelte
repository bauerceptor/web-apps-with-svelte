<script lang="ts">
let online = $state(true);
let width = $state(0);
let height = $state(0);

$effect(() => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  online = navigator.onLine;

  const updateSize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
  };

  const setOnline = () => {
    online = true;
  };

  const setOffline = () => {
    online = false;
  };

  updateSize();

  window.addEventListener('online', setOnline);
  window.addEventListener('offline', setOffline);
  window.addEventListener('resize', updateSize);

  return () => {
    window.removeEventListener('online', setOnline);
    window.removeEventListener('offline', setOffline);
    window.removeEventListener('resize', updateSize);
  };
});
</script>

<div class="card stack dashboard">
  <h2>Window Status</h2>

  <div class="tiles">
    <div class="tile">
      <span class="tile-label">Connection</span>
      <span class="tile-value" class:online class:offline={!online}>
        {online ? 'Online' : 'Offline'}
      </span>
    </div>

    <div class="tile">
      <span class="tile-label">Viewport width</span>
      <span class="tile-value">{width}px</span>
    </div>

    <div class="tile">
      <span class="tile-label">Viewport height</span>
      <span class="tile-value">{height}px</span>
    </div>
  </div>
</div>

<style>
  @layer base, components, utilities;

  @layer components {
    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      gap: var(--space-md);
    }

    .tile {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
    }

    .tile-label {
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .tile-value {
      font-size: 1.25rem;
      font-weight: 600;
      font-family: var(--font-mono);
    }

    .online {
      color: var(--color-success, #22c55e);
    }

    .offline {
      color: var(--color-error, #ef4444);
    }
  }
</style>
