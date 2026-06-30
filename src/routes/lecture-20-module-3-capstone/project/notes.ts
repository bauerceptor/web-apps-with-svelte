import { writable } from 'svelte/store';

export type Note = {
  id: string;
  title: string;
  body: string;
  updatedAt: number;
};

const STORAGE_KEY = 'lecture-20-notes';

function getDefaultNotes(): Note[] {
  return [
    {
      id: 'note-1',
      title: 'Welcome',
      body: '# Welcome\n\nThis is a **markdown** note.',
      updatedAt: Date.now(),
    },
  ];
}

function loadNotes(): Note[] {
  if (typeof window === 'undefined') return getDefaultNotes();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultNotes();
    const parsed = JSON.parse(raw) as Note[];
    return parsed.length ? parsed : getDefaultNotes();
  } catch {
    return getDefaultNotes();
  }
}

function createNotesStore() {
  const { subscribe, set, update } = writable<Note[]>(loadNotes());

  return {
    subscribe,
    add(title: string) {
      const note: Note = {
        id: `note-${Date.now()}`,
        title: title || 'Untitled',
        body: '',
        updatedAt: Date.now(),
      };
      update((notes) => [note, ...notes]);
      return note.id;
    },
    updateNote(id: string, changes: Partial<Note>) {
      update((notes) =>
        notes.map((note) =>
          note.id === id ? { ...note, ...changes, updatedAt: Date.now() } : note,
        ),
      );
    },
    remove(id: string) {
      update((notes) => notes.filter((note) => note.id !== id));
    },
  };
}

export const notes = createNotesStore();

export function saveNotesToStorage(value: Note[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage errors.
  }
}
