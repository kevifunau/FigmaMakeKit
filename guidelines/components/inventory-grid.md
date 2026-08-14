# InventoryGrid

A grid of inventory slots for bags, storage, and item banks.

## When to use

Grid inventories, bags, storage chests, loadout grids. Renders `rows * cols`
slots, filling them from the `items` array in order; slots past the array end
render as empty. It composes `ItemSlot` for every cell, so rarity borders and
selection rings come for free. Use `ItemSlot` standalone when only a single
slot is shown outside a grid.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `rows` | `number` | — | number of rows (required) |
| `cols` | `number` | — | number of columns (required) |
| `items` | `Item[]` | — | items to place, slot order (required) |
| `className` | `string` | — | extra classes |
| `bindings` | `Record<string, string>` | — | serialized as `data-bindings` |

## Item type

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | unique key (required) |
| `name` | `string` | displayed when no `icon` (required) |
| `icon` | `string` | image URL; first letter of `name` shown if absent |
| `rarity` | `'common' \| 'rare' \| 'epic' \| 'legendary'` | drives the border token |
| `quantity` | `number` | stacked count shown bottom-right when > 1 |

## Examples

```tsx
// CORRECT — 4×6 bag grid
<InventoryGrid rows={4} cols={6} items={items} />

// CORRECT — small 2×2 with one item
<InventoryGrid rows={2} cols={2} items={[sword]} />
```

```tsx
// WRONG — raw divs with inline grid and hardcoded colors
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
  <div style={{ border: '1px solid #263041', backgroundColor: '#1A2330' }} />
</div>
```

Why wrong: inline `gridTemplateColumns` and hardcoded hex bypass the token
system, and every cell re-implements slot chrome that `ItemSlot` already
provides.

## Decision tree

```
Is it a multi-cell item collection?
│
├─ Yes, a grid of cells → InventoryGrid (rows, cols, items)
│
└─ Is it a single item shown on its own (loot, equipped item, preview)?
    │
    └─ Yes → ItemSlot directly

Is the collection a vertical list instead?
    │
    └─ Yes → a row layout with ItemSlot per row (this kit has no list
             component; compose with gap utilities)
```
