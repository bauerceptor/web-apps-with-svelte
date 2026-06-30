<script lang="ts">
import ProfileCard from './ProfileCard.svelte';

type User = {
  name: string;
  role: string;
  bio: string;
};

let user = $state<User>({
  name: 'Alex Rivera',
  role: 'Developer',
  bio: 'Building friendly web apps with Svelte.',
});
</script>

<div class="card stack builder">
  <h2>Profile Builder</h2>

  <div class="editor">
    <label class="field">
      Name
      <input type="text" bind:value={user.name} />
    </label>

    <label class="field">
      Role
      <select bind:value={user.role}>
        <option>Developer</option>
        <option>Designer</option>
        <option>Manager</option>
      </select>
    </label>

    <label class="field">
      Bio
      <textarea bind:value={user.bio} rows="4"></textarea>
    </label>
  </div>

  <ProfileCard {user} />
</div>

<style>
  /* :is groups the editable fields so they share the same layout. */
  :is(.field, .builder h2) {
    font-family: var(--font-heading);
  }

  .editor {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
</style>
