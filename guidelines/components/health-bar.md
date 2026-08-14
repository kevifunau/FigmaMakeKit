# HealthBar

A game status meter for health, mana, stamina, or experience points.

## When to use

Any game status bar — HP, MP, SP, XP, energy, ammo. `resource` controls the
**color only** (it maps to a game-status token), and `variant` controls the
**visual structure only** — the two are orthogonal, so a mana bar can be
segmented. A text label (`current/max`) is rendered automatically while
`max <= 1000`; omit the component entirely for decorations that are not a real
meter.

## Variants

| Variant | Visual | Typical usage |
| --- | --- | --- |
| `resource="health"` | red fill (`bg-health`) | player / enemy HP |
| `resource="mana"` | blue fill (`bg-mana`) | mana, energy, MP |
| `resource="stamina"` | green fill (`bg-stamina`) | stamina, sprint, SP |
| `resource="xp"` | amber fill (`bg-xp`) | experience, level progress |
| `variant="smooth"` | one continuous fill | FPS-style HUD bars |
| `variant="segmented"` | row of discrete segments | classic RPG HP chunks |

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `current` | `number` | — | current value (required) |
| `max` | `number` | — | maximum value (required) |
| `resource` | `'health' \| 'mana' \| 'stamina' \| 'xp'` | `'health'` | maps to a color token |
| `variant` | `'segmented' \| 'smooth'` | `'smooth'` | visual structure |
| `segments` | `number` | — | used only when `variant === 'segmented'` |
| `className` | `string` | — | extra classes |
| `bindings` | `Record<string, string>` | — | serialized as `data-bindings` |

## Usage notes

- Use `segments={10}` for a classic RPG bar; omit `segments` (smooth) for an
  FPS-style bar.
- The number of filled segments rounds to `round((current / max) * segments)`,
  so `75/100` with 10 segments fills 8 of 10.

## Examples

```tsx
// CORRECT — segmented health bar, 10 segments
<HealthBar current={75} max={100} resource="health" variant="segmented" segments={10} />

// CORRECT — smooth mana bar
<HealthBar current={40} max={100} resource="mana" />
```

```tsx
// WRONG — hardcoded color, raw div, no semantics
<div className="bg-red-500 h-2" style={{ width: '75%' }} />
```

Why wrong: hardcoded `bg-red-500` bypasses the token system (theming breaks),
it is a bare div with no meter semantics, and the width math is inline instead
of the component's `current/max` contract.

## Decision tree

```
What is the meter showing?
│
├─ Health (HP)  → resource="health"  (red)
├─ Mana / MP    → resource="mana"    (blue)
├─ Stamina / SP → resource="stamina" (green)
└─ XP / level   → resource="xp"      (amber)

How should it look?
│
├─ One continuous fill → variant="smooth" (omit segments)
└─ Discrete chunks     → variant="segmented" segments={10}
```
