# SkillBar

A row of ability shortcuts with keybind labels and optional cooldown overlays.

## When to use

Ability hotbars, skill shortcuts, spell rows. Renders up to `maxSlots` cells;
empty cells show a dashed placeholder. Use it for anything bound to a key — not
for meters (that is `HealthBar`).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `skills` | `Skill[]` | — | skills to display, slot order (required) |
| `maxSlots` | `number` | `8` | fixed slot count, pads with empties |
| `className` | `string` | — | extra classes |
| `bindings` | `Record<string, string>` | — | serialized as `data-bindings` |

## Skill type

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | unique key (required) |
| `name` | `string` | displayed when no `icon` (required) |
| `icon` | `string` | image URL; first letter of `name` shown if absent |
| `keybind` | `string` | label shown bottom-right; falls back to slot index |
| `cooldown` | `number` | > 0 draws a dark overlay over the cell |

## Usage notes

- The keybind label is shown **bottom-right** (`text-caption`), falling back to
  the slot index (`"1"`, `"2"`, …) when no `keybind` is given.
- A `cooldown > 0` draws a **dark overlay** (`bg-overlay`) across the whole
  cell — the keybind stays on top.

## Examples

```tsx
// CORRECT — 8-slot hotbar
<SkillBar skills={skills} maxSlots={8} />

// CORRECT — small 4-slot bar with cooldowns
<SkillBar skills={[slash, fireball, heal]} maxSlots={4} />
```

```tsx
// WRONG — raw flex row of buttons with hardcoded colors
<div style={{ display: 'flex', gap: '8px' }}>
  <button style={{ backgroundColor: '#131A24' }}>1</button>
</div>
```

Why wrong: inline layout and hardcoded surface color miss the keybind, cooldown,
and empty-slot behavior that `SkillBar` provides.

## Decision tree

```
How many ability slots?
│
├─ The game standard (usually 8) → leave maxSlots at 8
└─ A fixed smaller/larger row     → maxSlots={n}

Does the skill show cooldown state?
│
├─ Yes → set cooldown (> 0) → dark overlay renders
└─ No  → leave cooldown unset
```
