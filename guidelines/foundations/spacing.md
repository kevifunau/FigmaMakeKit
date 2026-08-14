# Spacing Foundations

Spacing comes only from the token scale. Every `space-*` token yields a
Tailwind utility (`p-1`, `gap-2`, `m-4`, …) at that pixel value.

## Spacing scale

| Token | Value | Utility examples |
| --- | --- | --- |
| `space-1` | 4px | `p-1`, `gap-1`, `m-1` |
| `space-2` | 8px | `p-2`, `gap-2`, `m-2` |
| `space-3` | 12px | `p-3`, `gap-3`, `m-3` |
| `space-4` | 16px | `p-4`, `gap-4`, `m-4` |
| `space-5` | 20px | `p-5`, `gap-5`, `m-5` |
| `space-6` | 24px | `p-6`, `gap-6`, `m-6` |
| `space-8` | 32px | `p-8`, `gap-8`, `m-8` |

(There is no `space-7` — jump straight from `space-6` to `space-8`.)

## Usage patterns

- **`gap-2`** (8px) — tight grids and inline clusters (skill bar cells,
  item-slot rows).
- **`gap-4`** (16px) — standard card internal rhythm (dialogue body between
  heading and text).
- **`p-4`** (16px) — panel and card padding.
- **`p-8`** (32px) — whole-page padding.

## Rule

Always use spacing utilities (`p-*`, `m-*`, `gap-*`). Never write arbitrary
pixel values (`style={{ padding: 12 }}`, `p-[13px]`, `w-[300px]`-style gutters)
— an arbitrary value is a hardcoded break from the scale and breaks consistency
across screens. When a gap between scale steps is truly required, use an
existing step rather than inventing one.
