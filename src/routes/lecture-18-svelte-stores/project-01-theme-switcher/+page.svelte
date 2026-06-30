<script lang="ts">
import { type Theme, theme } from './theme';

const options: Theme[] = ['light', 'dark', 'system'];

function resolveTheme(value: Theme): 'light' | 'dark' {
  if (value !== 'system') return value;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(value: Theme) {
  if (typeof document === 'undefined') return;

  const resolved = resolveTheme(value);
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(resolved);
}

$effect(() => {
  if (typeof window !== 'undefined') {
    theme.init();
  }
});

$effect(() => {
  applyTheme($theme);

  return () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
    }
  };
});
</script>

<div class="card stack">
  <h2>Theme Switcher</h2>

  <p>
    Choose a theme below. The store saves your choice to <code>localStorage</code>,
    and the page applies a class to <code>&lt;html&gt;</code> that respects the
    system preference when “System” is selected.
  </p>

  <div class="row">
    {#each options as option}
      <button
        class="theme-button"
        class:active={$theme === option}
        aria-pressed={$theme === option}
        onclick={() => theme.set(option)}
      >
        {option}
      </button>
    {/each}
  </div>
</div>

<style>
  @layer base, components, utilities;

  @layer components {
    .theme-button {
      text-transform: capitalize;
      background: var(--color-surface);
      color: var(--color-text);
      border-color: var(--color-border);
    }

    .theme-button.active {
      background: var(--color-primary);
      color: var(--color-primary-text);
      border-color: var(--color-primary);
    }
  }

  @layer utilities {
    :global(html.light) {
      --color-bg: #ffffff;
      --color-surface: #f5f5f5;
      --color-text: #111111;
      --color-text-muted: #666666;
      --color-border: #d1d5db;
      color-scheme: light;
    }

    :global(html.dark) {
      --color-bg: #0a0a0a;
      --color-surface: #171717;
      --color-text: #f5f5f5;
      --color-text-muted: #a3a3a3;
      --color-border: #404040;
      color-scheme: dark;
    }
  }
</style>
