<script lang="ts">
let message = $state('');
let lastSubmitted = $state('');

function submit(e: Event) {
  e.preventDefault();
  lastSubmitted = message;
  message = '';
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    message = '';
  }
}
</script>

<!-- :has() styles the form when the input has focus. -->
<form class="card stack keyboard-form" onsubmit={submit}>
  <h2>Keyboard Form</h2>

  <label class="row">
    Message:
    <input
      type="text"
      bind:value={message}
      onkeydown={handleKeydown}
      placeholder="Type and press Enter"
    />
  </label>

  <button type="submit" disabled={message.trim() === ''}>Submit</button>

  {#if lastSubmitted}
    <p class="submitted">Last submitted: {lastSubmitted}</p>
  {/if}
</form>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .keyboard-form:has(input:focus) {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .submitted {
    color: var(--color-text-muted);
  }
</style>
