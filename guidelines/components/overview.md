# Component Guidelines — Overview

This kit ships five game-UI components plus the foundation tokens (colors,
spacing, typography) described in `../foundations/`. Every component renders on
a dark theme and is styled exclusively with design tokens — never hardcoded hex,
px, or inline font sizes.

## Component catalog

| Component | Alt names | Purpose | Guidelines |
| --- | --- | --- | --- |
| HealthBar | HP bar, status bar, health bar | Game status display (health/mana/stamina/xp) | health-bar.md |
| InventoryGrid | item grid, bag grid | Grid inventory with slots | inventory-grid.md |
| ItemSlot | inventory slot, item cell | Single inventory slot with rarity | item-slot.md |
| SkillBar | hotbar, skill slots, ability bar | Skill shortcuts with keybinds | skill-bar.md |
| DialogueBox | NPC dialog, conversation box | NPC dialogue with portrait + Continue | dialogue-box.md |

## Component selection decision tree

```
Is it a status meter (HP / MP / SP / XP)?
│
├─ Yes → HealthBar
│        (resource tells the color, variant tells the look)
│
└─ No → Is it a grid of inventory slots?
         │
         ├─ Yes → InventoryGrid (composes ItemSlot for each cell)
         │        │
         │        └─ Showing ONE slot by itself? → ItemSlot
         │
         └─ No → Is it a row of ability shortcuts with keybinds?
                  │
                  ├─ Yes → SkillBar
                  │
                  └─ No → Is it NPC speech / story text?
                           │
                           ├─ Yes → DialogueBox
                           │
                           └─ No → Compose raw HTML with foundation tokens
                                    (bg-surface panels, text-body-1, spacing)
                                    — do not invent new components.
```

## Rules of thumb

- Prefer a component over hand-built markup: components carry the correct
  semantics, states, and token classes already.
- When composing, still use foundation tokens — `bg-surface`, `text-body-1`,
  `gap-4`, `rounded-md` — never raw hex or pixel values.
- Each component accepts `className` (extra classes) and `bindings` (a data map
  serialized as `data-bindings` for runtime binding).
