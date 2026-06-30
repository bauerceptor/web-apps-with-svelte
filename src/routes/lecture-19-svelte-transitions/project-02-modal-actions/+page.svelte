<script lang="ts">
import Modal from './Modal.svelte';

let showModal = $state(false);
</script>

<div class="card stack">
  <h2>Modal with Actions</h2>
  <p>A reusable modal that closes on outside click and traps focus.</p>

  <button onclick={() => (showModal = true)}>Open modal</button>

  <Modal bind:open={showModal} title="Confirm">
    <p>This modal uses two custom actions:</p>
    <ul>
      <li><code>use:clickOutside</code> to close when clicking outside.</li>
      <li><code>use:focusTrap</code> to keep Tab inside the modal.</li>
    </ul>
    <button onclick={() => (showModal = false)}>Confirm</button>
  </Modal>
</div>
