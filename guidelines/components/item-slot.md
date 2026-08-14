# ItemSlot

A single inventory cell with an optional rarity border and selection ring.

## When to use

A standalone inventory slot, a loot popup, an equipped-item cell, or a slot
inside a custom layout. Inside a bag, prefer `InventoryGrid` (it renders
`ItemSlot` per cell). Empty slots render with a neutral border and a placeholder
background.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `item` | `Item` | — | `id`, `name`, `icon?`, `rarity?`, `quantity?` |
| `selected` | `boolean` | — | adds `ring-2 ring-primary` |
| `className` | `string` | — | extra classes |
| `bindings` | `Record<string, string>` | — | serialized as `data-bindings` |

## Rarity decision tree

```
Does the item have a rarity?
│
├─ common    → green border (border-rarity-common)
├─ rare      → blue border  (border-rarity-rare)
├─ epic      → purple border (border-rarity-epic)
└─ legendary → amber border (border-rarity-legendary)

No rarity → neutral border (border-border)
```

## Examples

```tsx
// CORRECT — a common sword
<ItemSlot item={sword} />

// CORRECT — selected potion (selection ring on top of rarity border)
<ItemSlot item={potion} selected />
```

```tsx
// WRONG — raw div with a hex border
<div style={{ border: '1px solid #A855F7' }} />
```

Why wrong: the hardcoded purple hex re-implements the epic rarity border
outside the token system — it breaks theming and carries no item semantics.

## Notes

- `selected` adds `ring-2 ring-primary` around the existing rarity border, so
  selection and rarity stay visually distinct.
- Quantity is rendered bottom-right only when `quantity > 1`.
- The component reads no `item` → renders as an empty slot (neutral border).
