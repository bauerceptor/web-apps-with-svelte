<script lang="ts">
const colorOptions = ['Blue', 'Green', 'Red', 'Yellow'];
const featureOptions = ['Dark mode', 'Offline sync', 'Keyboard shortcuts', 'Mobile app'];

let favoriteColor = $state('Blue');
let wantedFeatures = $state<string[]>(['Dark mode']);

let totalVotes = $derived(1 + wantedFeatures.length);

function votesForColor(color: string): number {
  return favoriteColor === color ? 1 : 0;
}

function votesForFeature(feature: string): number {
  return wantedFeatures.includes(feature) ? 1 : 0;
}

function percent(value: number): string {
  return `${Math.round((value / totalVotes) * 100)}%`;
}
</script>

<div class="card stack poll">
  <h2>Survey Poll</h2>

  <fieldset class="question">
    <legend>Favorite color</legend>
    <div class="options">
      {#each colorOptions as color}
        <label class="option">
          <input type="radio" bind:group={favoriteColor} value={color} />
          {color}
        </label>
      {/each}
    </div>
  </fieldset>

  <fieldset class="question">
    <legend>Features you want</legend>
    <div class="options">
      {#each featureOptions as feature}
        <label class="option">
          <input type="checkbox" bind:group={wantedFeatures} value={feature} />
          {feature}
        </label>
      {/each}
    </div>
  </fieldset>

  <div class="results">
    <h3>Live results</h3>

    <h4>Colors</h4>
    {#each colorOptions as color}
      {@const count = votesForColor(color)}
      <div class="bar-row">
        <span class="bar-label">{color}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: {percent(count)}"></div>
        </div>
        <span class="bar-value">{percent(count)}</span>
      </div>
    {/each}

    <h4>Features</h4>
    {#each featureOptions as feature}
      {@const count = votesForFeature(feature)}
      <div class="bar-row">
        <span class="bar-label">{feature}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: {percent(count)}"></div>
        </div>
        <span class="bar-value">{percent(count)}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  @layer base, components, utilities;

  @layer base {
    fieldset {
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      padding: var(--space-md);
    }

    legend {
      padding-inline: var(--space-sm);
      font-weight: 600;
    }
  }

  @layer components {
    .options {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-md);
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .results {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .bar-row {
      display: grid;
      grid-template-columns: 10rem 1fr 3rem;
      align-items: center;
      gap: var(--space-sm);
    }

    .bar-label {
      font-size: 0.875rem;
    }

    .bar-track {
      height: 1rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: var(--color-primary);
      transition: width 0.3s ease;
    }

    .bar-value {
      font-size: 0.875rem;
      text-align: end;
      font-family: var(--font-mono);
    }
  }

  @layer utilities {
    .poll h3,
    .poll h4 {
      margin-block-start: var(--space-md);
    }
  }
</style>
