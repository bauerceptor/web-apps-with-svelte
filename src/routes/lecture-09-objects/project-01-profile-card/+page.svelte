<script lang="ts">
type User = {
  name: string;
  role: string;
  bio: string;
  location: string;
};

let user = $state<User>({
  name: 'Sam Rivera',
  role: 'Frontend Developer',
  bio: 'Teaching programming through small, useful web apps.',
  location: 'Remote',
});
</script>

<div class="card profile">
  <h2>{user.name}</h2>
  <p class="role">{user.role}</p>
  <p class="bio">{user.bio}</p>
  <p class="location">Location: {user.location}</p>
</div>

<style>
  .profile {
    h2 {
      font-family: var(--font-heading);
      font-size: 1.75rem;
    }

    .role {
      color: var(--color-primary);
      font-weight: 700;
      margin-block-end: var(--space-md);
    }

    .bio {
      line-height: 1.6;
      margin-block-end: var(--space-md);
    }

    .location {
      color: var(--color-text-muted);
      font-size: 0.875rem;
    }
  }
</style>
