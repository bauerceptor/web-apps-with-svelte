<script lang="ts">
type User = {
  name: string;
  role: string;
  bio: string;
};

type Props = {
  user: User;
};

let { user }: Props = $props();
</script>

<article class="card profile">
  <h3>{user.name}</h3>
  <p class="role">{user.role}</p>
  <p>{user.bio}</p>
</article>

<style>
  .profile {
    border-left: 4px solid var(--color-primary);
  }

  .profile h3 {
    font-family: var(--font-heading);
    margin-block-end: var(--space-xs);
  }

  .role {
    color: var(--color-text-muted);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
