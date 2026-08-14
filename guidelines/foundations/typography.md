# Typography Foundations

All text uses the type ramp tokens. Set font size only through the type
utilities — never `font-size` directly.

## Type scale

| Utility | Size | Typical usage |
| --- | --- | --- |
| `text-h1` | 26px | page titles |
| `text-h2` | 20px | section headings |
| `text-h3` | 16px | labels, speaker names |
| `text-body-1` | 14px | body text |
| `text-body-2` | 12px | secondary text |
| `text-caption` | 11px | metadata, keybinds |

## Decision tree

```
What kind of text is it?
├─ Page title            → text-h1
├─ Section heading       → text-h2
├─ Label / speaker name  → text-h3
├─ Primary body copy     → text-body-1
├─ Supporting / secondary→ text-body-2
└─ Metadata / keybinds   → text-caption
```

## Common patterns

- **Page header** — `text-h1` on the title, `text-h2` or `text-body-1`
  supporting line beneath.
- **Card section heading** — `text-h2` at the top of the card, `text-body-1`
  for its content.
- **Metadata** — keybind labels and quantities as `text-caption` (see
  `SkillBar`, `ItemSlot`).

## Rules

- Always use type utilities (`text-h1` … `text-caption`); never set
  `font-size` directly or use arbitrary classes like `text-[13px]`.
- Pair with text-color tokens for hierarchy: primary content in
  `text-text-primary`, supporting text in `text-text-secondary`.
- When in doubt between two adjacent sizes, choose the larger for titles and
  the smaller for metadata.
