# Color Foundations

Every color in this kit comes from a token. Never write raw hex in component
markup or styles — the tokens carry the dark theme and enable retheming.

## Palette overview

| Group | Tokens | Usage |
| --- | --- | --- |
| Brand & semantic | `primary`, `secondary`, `tertiary`, `warning`, `danger` (each with `-hover`, `-press`, `-soft`) | actions, accents, alerts; one role per intent |
| Text | `text-primary`, `text-secondary`, `text-disabled`, `text-on-accent` | hierarchy on surfaces |
| Surfaces | `bg`, `surface`, `surface-elev`, `surface-hover`, `border`, `border-strong` | page / panel / raised layers and edges |
| Rarity | `rarity-common`, `rarity-rare`, `rarity-epic`, `rarity-legendary` | item borders in slots |
| Game status | `health`, `mana`, `stamina`, `xp` | status meters |

## Naming pattern

Tokens follow `--color-{group}-{role}` (e.g. `--color-surface-elev`,
`--color-rarity-legendary`). Tailwind v4 maps them to utilities with the same
shape: `bg-{role}`, `text-{role}`, `border-{role}`.

## Tailwind class mapping

| Class | Token |
| --- | --- |
| `bg-primary` | `--color-primary` |
| `text-text-primary` | `--color-text-primary` |
| `border-border` | `--color-border` |
| `bg-surface`, `bg-surface-elev`, `bg-surface-hover` | surface stack |
| `bg-bg` | `--color-bg` |
| `bg-health`, `bg-mana`, `bg-stamina`, `bg-xp` | game status fills |
| `border-rarity-legendary` | `--color-rarity-legendary` |
| `bg-overlay` | `--color-overlay` |

## Decision trees

Background color:

```
What is being colored?
├─ The whole page   → bg-bg
├─ A panel / card   → bg-surface
└─ An elevated layer (slot, popup, hover row) → bg-surface-elev
```

Text color:

```
Where is the text?
├─ On a surface, primary content   → text-text-primary
├─ On a surface, supporting text   → text-text-secondary
├─ Disabled / unavailable          → text-text-disabled
└─ On a solid accent button        → text-text-on-accent
```

Border color:

```
Is the border the resting edge?
├─ Yes → border-border
└─ Needs emphasis (focused/strong) → border-border-strong
```

## Common mistakes

- **Brand color overuse** — green (`primary`) is not for everything. Use
  semantic roles: `danger` for errors, `warning` for cautions, `primary` for
  the main call to action only.
- **Wrong "on-" role** — `text-on-accent` belongs on solid accent buttons, not
  on regular panels (use `text-text-primary` there).
- **Hardcoding hex** — `#22C55E` in markup is always wrong; use `bg-primary`.
