<script lang="ts">
import { notes, type Note } from './notes';
import { renderMarkdown } from './markdown';
import Heading from './Heading.svelte';

let { note } = $props<{ note: Note }>();

let showPreview = $state(false);

function updateTitle(event: Event) {
  const target = event.target as HTMLInputElement;
  notes.updateNote(note.id, { title: target.value });
}

function updateBody(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  notes.updateNote(note.id, { body: target.value });
}
</script>

<div class="editor">
  <input
    class="title-input"
    type="text"
    value={note.title}
    oninput={updateTitle}
    placeholder="Note title"
  />

  <div class="mode-toggle">
    <button onclick={() => (showPreview = false)} class:active={!showPreview}>Edit</button>
    <button onclick={() => (showPreview = true)} class:active={showPreview}>Preview</button>
  </div>

  {#if showPreview}
    <div class="preview">
      <Heading level={1}>{note.title || 'Untitled'}</Heading>
      {@html renderMarkdown(note.body)}
    </div>
  {:else}
    <textarea
      class="body-input"
      value={note.body}
      oninput={updateBody}
      placeholder="Write markdown here…"
    ></textarea>
  {/if}
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    height: 100%;
  }

  .title-input {
    font-size: 1.5rem;
    font-weight: 700;
    padding: var(--space-sm) 0;
    border: none;
    border-bottom: 1px solid var(--color-border);
    background: transparent;
    font-family: var(--font-heading);
  }

  .mode-toggle {
    display: flex;
    gap: var(--space-sm);
  }

  .mode-toggle button {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
  }

  .mode-toggle button.active {
    background: var(--color-primary);
    color: var(--color-primary-text);
    border-color: var(--color-primary);
  }

  .body-input {
    flex: 1;
    min-height: 12rem;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-family: var(--font-mono);
    resize: vertical;
  }

  .preview {
    flex: 1;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    overflow: auto;
  }

  .preview :global(h1),
  .preview :global(h2),
  .preview :global(h3) {
    margin-block: var(--space-md) var(--space-sm);
  }

  .preview :global(ul) {
    padding-inline-start: var(--space-lg);
  }
</style>
