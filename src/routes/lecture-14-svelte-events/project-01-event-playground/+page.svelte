<script lang="ts">
type LogEntry = {
  id: number;
  message: string;
};

let logs = $state<LogEntry[]>([]);
let nextId = $state(1);

function addLog(message: string) {
  logs = [...logs, { id: nextId, message }];
  nextId = nextId + 1;
}

function handleSubmit(event: Event) {
  // preventDefault stops the browser from reloading the page on submit.
  event.preventDefault();
  addLog('Form submitted (default prevented)');
}

function handleOuterClick() {
  addLog('Outer box clicked');
}

function handleInnerClick(event: Event) {
  // stopPropagation keeps this click from reaching the outer box.
  event.stopPropagation();
  addLog('Inner box clicked (propagation stopped)');
}

function handleKeydown(event: KeyboardEvent) {
  addLog(`Key pressed: ${event.key}`);
}

function clearLogs() {
  logs = [];
  nextId = 1;
}
</script>

<div class="card stack playground">
  <h2>Event Playground</h2>

  <form class="stack" onsubmit={handleSubmit}>
    <label class="row">
      Type here:
      <input type="text" onkeydown={handleKeydown} placeholder="Press keys..." />
    </label>
    <button type="submit">Submit form</button>
  </form>

  <div class="box outer" onclick={handleOuterClick} role="button" tabindex="0">
    <p>Outer box</p>
    <div class="box inner" onclick={handleInnerClick} role="button" tabindex="0">
      <p>Inner box</p>
    </div>
  </div>

  <div class="log">
    <div class="row log-header">
      <h3>Event log</h3>
      <button onclick={clearLogs}>Clear</button>
    </div>

    {#if logs.length === 0}
      <p class="empty">No events yet.</p>
    {:else}
      <ul>
        {#each logs as log (log.id)}
          <li>{log.message}</li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  @keyframes press {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.96);
    }
    100% {
      transform: scale(1);
    }
  }

  button {
    animation: press 0.2s ease;
    animation-play-state: paused;
  }

  button:active {
    animation-play-state: running;
  }

  .box {
    padding: var(--space-lg);
    border: 2px dashed var(--color-border);
    border-radius: var(--radius);
    cursor: pointer;
  }

  .outer {
    background: var(--color-surface);
  }

  .inner {
    margin-block-start: var(--space-md);
    background: var(--color-bg);
  }

  .log {
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  .log-header {
    justify-content: space-between;
  }

  .empty {
    color: var(--color-text-muted);
  }

  .log ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    max-height: 12rem;
    overflow-y: auto;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }

  .log li {
    padding: var(--space-xs) var(--space-sm);
    background: var(--color-bg);
    border-radius: var(--radius);
  }
</style>
