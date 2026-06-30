<script lang="ts">
  // A variable that holds the user's name. $state makes it reactive.
  let name = $state('');
</script>

<div class="card stack">
  <h2>Greeter</h2>

  <label class="row">
    Your name:
    <input type="text" bind:value={name} placeholder="Type your name" />
  </label>

  <!-- Output changes automatically when name changes. -->
  <p class="greeting">
    {#if name}
      Hello, {name}!
    {:else}
      Hello, stranger!
    {/if}
  </p>

  <button onclick={() => (name = '')}>Clear</button>
</div>

<style>
  .greeting {
    font-size: 1.25rem;
    color: var(--color-primary);
  }
</style>
