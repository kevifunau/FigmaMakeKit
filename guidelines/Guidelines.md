# Game UI Kit — Design System Guidelines

## Product character

This is a **game UI** kit with a **dark, immersive** style. Density: compact. Surface strategy: layered dark surfaces. Color: ~80% dark surfaces, game-specific colors (health red, mana blue) used for status bars only. Corner style: rounded (radius-md 8px default, radius-lg 12px for cards).

## Reading order

MUST READ before writing any code:

1. This file — product character, rules, workflows.
2. setup.md — CSS imports, build config.
3. foundations/ — all token files (color, spacing, typography).
4. components/overview.md — full component catalog.

Read on-demand: components/{name}.md — read BEFORE using that component.

## Workflows

### Before using a component

1. Check components/overview.md to find the component that fits the pattern.
2. Read the component doc (components/{name}.md) for its full prop list and variants.
3. Follow the rules in this file — do not improvise a new pattern when a component exists.

### Before using a color

1. Check the decision tree in foundations/color.md.
2. Prefer a token class (e.g. bg-surface) over any raw value.
3. Only use game-specific colors (health red, mana blue) for status bars, never for surfaces or text.

## Rules

- Always use kit components over raw HTML for game UI patterns (HealthBar not div+bg-red).
- All colors must use token classes (bg-surface, text-text-primary) — never hardcode hex.
- Game status bars must use HealthBar with the correct variant.
- Inventory must use InventoryGrid.
- Skill bars must use SkillBar.
- NPC dialogue must use DialogueBox.
