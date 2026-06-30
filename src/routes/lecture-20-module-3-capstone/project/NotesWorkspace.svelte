<script lang="ts">
import { setContext } from 'svelte';
import { writable } from 'svelte/store';
import { notes, saveNotesToStorage } from './notes';
import SearchBar from './SearchBar.svelte';
import Toolbar from './Toolbar.svelte';
import NoteList from './NoteList.svelte';
import NoteEditor from './NoteEditor.svelte';
import { clickOutside } from './actions';

let searchQuery = $state('');
let selectedId = writable<string | null>(null);
let showSearchPanel = $state(true);

setContext('selectedId', selectedId);

$effect(() => {
  saveNotesToStorage($notes);
});

let selectedNote = $derived($notes.find((note) => note.id === $selectedId));

function addNote() {
  const id = notes.add('New note');
  selectedId.set(id);
  searchQuery = '';
}

function deleteNote() {
  const current = $selectedId;
  if (!current) return;
  notes.remove(current);
  selectedId.set(null);
}

function handleKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    const input = document.querySelector('.search input') as HTMLInputElement | null;
    input?.focus();
    showSearchPanel = true;
  }
}
</script>

<svelte:head>
  <title>{selectedNote?.title ? `${selectedNote.title} — Notes` : 'Markdown Notes'}</title>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="workspace">
  <aside
    class="sidebar"
    class:closed={!showSearchPanel}
    use:clickOutside={() => {
      if (window.innerWidth < 640) showSearchPanel = false;
    }}
  >
    <Toolbar onAdd={addNote} onDelete={deleteNote} canDelete={!!$selectedId} />
    <SearchBar bind:query={searchQuery} />
    <NoteList searchQuery={searchQuery} />
  </aside>

  <main class="main">
    <button
      class="toggle-sidebar"
      onclick={() => (showSearchPanel = !showSearchPanel)}
      aria-label="Toggle sidebar"
    >
      ☰
    </button>

    {#if selectedNote}
      <NoteEditor note={selectedNote} />
    {:else}
      <div class="empty-state">
        <p>Select a note or create a new one.</p>
      </div>
    {/if}
  </main>
</div>

<style>
  .workspace {
    display: grid;
    grid-template-columns: 18rem 1fr;
    gap: var(--space-md);
    min-height: 70vh;
  }

  @media (max-width: 639px) {
    .workspace {
      grid-template-columns: 1fr;
      position: relative;
    }
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  @media (max-width: 639px) {
    .sidebar {
      position: absolute;
      inset: 0;
      z-index: 10;
      background: var(--color-bg);
    }

    .sidebar.closed {
      display: none;
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    min-width: 0;
  }

  .toggle-sidebar {
    align-self: flex-start;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
  }

  .empty-state {
    flex: 1;
    display: grid;
    place-items: center;
    color: var(--color-text-muted);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius);
  }
</style>
