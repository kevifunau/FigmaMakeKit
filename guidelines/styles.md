# Styles

## Layout principles

- Use flex and grid for game UI layout by default — flex for one-dimensional rows/columns, grid for slot-heavy panels such as inventories and skill bars.
- Use absolute positioning only for HUD overlays (top-left health/mana, center crosshair, dialogue at the bottom) that sit above the gameplay layer.
- Keep density compact: tight gaps, small controls, no wasted space.

## Spacing scale

4px base unit:

| Token | Pixels | Utility |
|-------|--------|---------|
| space-1 | 4 | p-1 |
| space-2 | 8 | p-2 |
| space-3 | 12 | p-3 |
| space-4 | 16 | p-4 |
| space-5 | 20 | p-5 |
| space-6 | 24 | p-6 |
| space-8 | 32 | p-8 |

## Typography hierarchy

| Token | Size | Usage |
|-------|------|-------|
| h1 | 26px | Titles |
| h2 | 20px | Section headings |
| h3 | 16px | Labels |
| body-1 | 14px | Body text |
| body-2 | 12px | Secondary text |
| caption | 11px | Metadata |

Use the matching utilities (text-h1, text-body-2, text-caption). Headings are for screen structure; body-1 is the default text size.

## Border radius

| Surface | Radius |
|---------|--------|
| Cards | 12px — radius-lg |
| Buttons | full — rounded-full (pill) |
| Slots (inventory, skill bars) | 8px — radius-md |

## Game-UI conventions

- HUD (health, mana, stamina, xp bars): top-left.
- Skills / ability bar: bottom-center.
- Inventory: grid of ItemSlots, opened as an overlay panel.
- NPC dialogue: DialogueBox spanning the bottom, full-width.
