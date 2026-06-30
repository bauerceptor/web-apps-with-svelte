<script lang="ts">
type Settings = {
  username: string;
  email: string;
  language: string;
  notifications: boolean;
  darkMode: boolean;
  bio: string;
};

let settings = $state<Settings>({
  username: 'student',
  email: 'hello@example.com',
  language: 'en',
  notifications: true,
  darkMode: false,
  bio: 'I am learning Svelte.',
});

let formElement: HTMLFormElement | undefined = $state();

function focusForm() {
  // bind:this lets us reach into the DOM when we need to.
  formElement?.focus();
}
</script>

<div class="card stack settings">
  <h2>Settings Form</h2>

  <form bind:this={formElement} class="stack">
    <label class="field">
      Username
      <input type="text" bind:value={settings.username} />
    </label>

    <label class="field">
      Email
      <input type="email" bind:value={settings.email} />
    </label>

    <label class="field">
      Language
      <select bind:value={settings.language}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </label>

    <label class="field checkbox">
      <input type="checkbox" bind:checked={settings.notifications} />
      Enable notifications
    </label>

    <label class="field checkbox">
      <input type="checkbox" bind:checked={settings.darkMode} />
      Dark mode
    </label>

    <label class="field">
      Bio
      <textarea bind:value={settings.bio} rows="4"></textarea>
    </label>

    <button type="button" onclick={focusForm}>Focus form</button>
  </form>

  <pre class="preview">{JSON.stringify(settings, null, 2)}</pre>
</div>

<style>
  @layer base, components, utilities;

  @layer base {
    label {
      font-family: var(--font-heading);
    }
  }

  @layer components {
    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .field.checkbox {
      flex-direction: row;
      align-items: center;
      gap: var(--space-sm);
    }

    .preview {
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      font-family: var(--font-mono);
      font-size: 0.875rem;
      overflow-x: auto;
    }
  }

  @layer utilities {
    .settings :global(.stack) {
      gap: var(--space-md);
    }
  }
</style>
