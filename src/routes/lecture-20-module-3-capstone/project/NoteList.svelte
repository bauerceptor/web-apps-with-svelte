<script lang="ts">
import { getContext } from 'svelte';
import { fly } from 'svelte/transition';
import type { Writable } from 'svelte/store';
import { notes } from './notes';

let { searchQuery } = $props();
const selectedId = getContext<Writable<string | null>>('selectedId');

let filteredNotes = $derived(
  $notes
    .filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.updatedAt - a.updatedAt),
);
</script>

<ul class="note-list">
  {#each filteredNotes as note (note.id)}
    <li
      class="note-item"
      class:active={$selectedId === note.id}
      transition:fly={{ x: -10, duration: 200 }}
    >
      <button class="note-button" onclick={() => selectedId.set(note.id)}>
        <span class="note-title">{note.title || 'Untitled'}</span>
        <span class="note-date">{new Date(note.updatedAt).toLocaleDateString()}</span>
      </button>
    </li>
  {:else}
    <li class="empty">No notes found.</li>
  {/each}
</ul>

<style>
  .note-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .note-item {
    border-radius: var(--radius);
    overflow: hidden;
  }

  .note-item.active {
    background: var(--color-primary);
  }

  .note-button {
    width: 100%;
    text-align: start;
    padding: var(--space-md);
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .note-item.active .note-button {
    color: var(--color-primary-text);
  }

  .note-title {
    font-weight: 600;
  }

  .note-date {
    font-size: 0.75rem;
    opacity: 0.8;
  }

  .empty {
    color: var(--color-text-muted);
    padding: var(--space-md);
  }
</style>
