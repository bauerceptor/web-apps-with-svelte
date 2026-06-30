<script lang="ts">
const STORAGE_KEY = 'lecture-17-notepad';
const SAVE_DELAY_MS = 800;

let status = $state('Start typing to save.');
let lastSaved = $state<string | null>(null);

function restoreContent(): string {
  if (typeof window === 'undefined') return '';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      status = 'Restored from storage.';
      return saved;
    }
  } catch {
    // ignore storage errors during restore
  }
  return '';
}

let content = $state(restoreContent());
let hasTyped = $state(false);

function handleInput() {
  hasTyped = true;
}

$effect(() => {
  const text = content;

  if (typeof window === 'undefined' || !hasTyped) return;

  status = 'Waiting for you to stop typing...';

  const timeoutId = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, text);
      status = 'Saved to localStorage.';
      lastSaved = new Date().toLocaleTimeString();
    } catch {
      status = 'Save failed.';
    }
  }, SAVE_DELAY_MS);

  return () => {
    clearTimeout(timeoutId);
  };
});
</script>

<div class="card stack notepad">
  <h2>Auto-Save Notepad</h2>

  <p>
    Type below. Your note is restored when the page loads and saved after you
    stop typing for {SAVE_DELAY_MS}ms.
  </p>

  <label for="notepad-editor">Your note</label>
  <textarea
    id="notepad-editor"
    class="editor"
    bind:value={content}
    oninput={handleInput}
    rows="10"
    placeholder="Write something..."
  ></textarea>

  <div class="meta">
    <p class="status">{status}</p>
    {#if lastSaved}
      <p class="timestamp">Last saved: {lastSaved}</p>
    {/if}
  </div>
</div>

<style>
  @layer base, components, utilities;

  @layer base {
    textarea {
      font-family: inherit;
    }
  }

  @layer components {
    .editor {
      width: 100%;
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      resize: vertical;
      line-height: 1.5;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: var(--space-sm);
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .status {
      font-weight: 600;
      color: var(--color-text);
    }

    .timestamp {
      font-family: var(--font-mono);
    }
  }
</style>
