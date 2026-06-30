<script lang="ts">
type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
};

let { value, onIncrement, onDecrement, onReset }: Props = $props();
</script>

<div class="card stepper">
  <button class="step-button" onclick={onDecrement} aria-label="Decrease">-</button>
  <span class="value">{value}</span>
  <button class="step-button" onclick={onIncrement} aria-label="Increase">+</button>
  <button class="reset-button" onclick={onReset}>Reset</button>
</div>

<style>
  @keyframes press {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.92);
    }
    100% {
      transform: scale(1);
    }
  }

  .stepper {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    flex-wrap: wrap;
  }

  .value {
    font-size: 2rem;
    font-weight: 700;
    font-family: var(--font-mono);
    min-width: 4rem;
    text-align: center;
  }

  .step-button,
  .reset-button {
    animation: press 0.15s ease;
    animation-play-state: paused;
  }

  .step-button:active,
  .reset-button:active {
    animation-play-state: running;
  }

  .step-button {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    padding: 0;
  }
</style>
