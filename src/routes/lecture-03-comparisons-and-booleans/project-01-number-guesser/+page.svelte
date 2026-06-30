<script lang="ts">
  // Pick a secret number between 1 and 100.
  let secret = $state(Math.floor(Math.random() * 100) + 1);
  let guess = $state(50);
  let message = $state('Make a guess!');

  function check() {
    if (guess === secret) {
      message = 'Correct!';
    } else if (guess < secret) {
      message = 'Too low.';
    } else {
      message = 'Too high.';
    }
  }

  function reset() {
    secret = Math.floor(Math.random() * 100) + 1;
    guess = 50;
    message = 'Make a guess!';
  }
</script>

<div class="card stack">
  <h2>Number Guesser</h2>

  <label class="row">
    Your guess:
    <input type="number" bind:value={guess} min="1" max="100" />
  </label>

  <div class="row">
    <button onclick={check}>Check</button>
    <button onclick={reset}>New number</button>
  </div>

  <p class="message" class:correct={message === 'Correct!'}>{message}</p>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .message {
    font-weight: 700;
    color: var(--color-error);
  }

  .message.correct {
    color: var(--color-success);
  }
</style>
