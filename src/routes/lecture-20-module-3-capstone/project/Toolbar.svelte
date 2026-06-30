<script lang="ts">
let { onAdd, onDelete, canDelete } = $props<{
  onAdd: () => void;
  onDelete: () => void;
  canDelete: boolean;
}>();
</script>

<div class="toolbar">
  <button onclick={onAdd}>New note</button>
  <button onclick={onDelete} disabled={!canDelete}>Delete</button>
</div>

<style>
  .toolbar {
    display: flex;
    gap: var(--space-sm);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
