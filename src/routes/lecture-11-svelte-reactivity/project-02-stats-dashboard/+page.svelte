<script lang="ts">
let scores = $state<number[]>([72, 85, 90, 64, 88]);

// $derived values update automatically when scores change.
let count = $derived(scores.length);
let sum = $derived(scores.reduce((total, value) => total + value, 0));
let average = $derived(count > 0 ? sum / count : 0);
let max = $derived(count > 0 ? Math.max(...scores) : 0);
let min = $derived(count > 0 ? Math.min(...scores) : 0);

function addScore() {
  const value = Math.floor(Math.random() * 40) + 60;
  scores = [...scores, value];
}

function removeLast() {
  scores = scores.slice(0, -1);
}

function reset() {
  scores = [72, 85, 90, 64, 88];
}
</script>

<div class="card stack dashboard">
  <h2>Stats Dashboard</h2>

  <div class="stats">
    <div class="stat">
      <span class="stat-label">Count</span>
      <span class="stat-value">{count}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Sum</span>
      <span class="stat-value">{sum}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Average</span>
      <span class="stat-value">{average.toFixed(1)}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Max</span>
      <span class="stat-value">{max}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Min</span>
      <span class="stat-value">{min}</span>
    </div>
  </div>

  <div class="row">
    <button onclick={addScore}>Add random score</button>
    <button onclick={removeLast}>Remove last</button>
    <button onclick={reset}>Reset</button>
  </div>

  <h3>Scores</h3>
  <ul class="score-list">
    {#each scores as score, index (score + '-' + index)}
      <li class="score-item" style="--score: {score}">{score}</li>
    {:else}
      <li class="empty">No scores yet.</li>
    {/each}
  </ul>
</div>

<style>
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: var(--space-md);
  }

  .stat {
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    transition: transform 0.2s ease;
  }

  .stat:hover {
    transform: translateY(-2px);
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: var(--font-mono);
  }

  .score-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    list-style: none;
    padding: 0;
  }

  .score-item {
    padding: var(--space-sm) var(--space-md);
    background: hsl(calc(var(--score) * 1.2), 70%, 85%);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-weight: 600;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
  }

  .score-item:hover {
    transform: scale(1.05);
  }
</style>
