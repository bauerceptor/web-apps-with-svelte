<script lang="ts">
  type Product = {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
  };

  let products = $state<Product[]>([
    { id: 1, name: 'Notebook', price: 12, inStock: true },
    { id: 2, name: 'Pen set', price: 8, inStock: true },
    { id: 3, name: 'Desk lamp', price: 35, inStock: false }
  ]);

  function toggleStock(id: number) {
    products = products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p));
  }
</script>

<div class="card stack">
  <h2>Product List</h2>

  <ul class="product-list">
    {#each products as product}
      <li class="product">
        <div>
          <h3>{product.name}</h3>
          <p class="price">${product.price}</p>
        </div>
        <button class:stock={product.inStock} onclick={() => toggleStock(product.id)}>
          {product.inStock ? 'In stock' : 'Out of stock'}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  h2 {
    font-family: var(--font-heading);
  }

  .product-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);

    h3 {
      font-family: var(--font-heading);
      margin-block-end: var(--space-xs);
    }

    .price {
      color: var(--color-text-muted);
    }

    button {
      background: var(--color-error);
      border-color: var(--color-error);
    }

    button.stock {
      background: var(--color-success);
      border-color: var(--color-success);
    }
  }
</style>
