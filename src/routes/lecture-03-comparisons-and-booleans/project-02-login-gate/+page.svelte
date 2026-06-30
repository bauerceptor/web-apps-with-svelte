<script lang="ts">
  let username = $state('');
  let password = $state('');

  // Both conditions must be true for access to be granted.
  let isValid = $derived(username === 'student' && password === 'svelte');
</script>

<div class="card stack">
  <h2>Login Gate</h2>

  <label class="row">
    Username:
    <input type="text" bind:value={username} />
  </label>

  <label class="row">
    Password:
    <input type="password" bind:value={password} />
  </label>

  <p class="status" class:valid={isValid}>
    {isValid ? 'Access granted' : 'Access denied'}
  </p>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .status {
    font-weight: 700;
    color: var(--color-error);
  }

  .status.valid {
    color: var(--color-success);
  }
</style>
