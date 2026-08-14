# DialogueBox

A conversation panel with a portrait, speaker name, dialogue text, and an
optional Continue button.

## When to use

NPC dialogue, story text, quest intros, tutorial callouts. Shows the portrait
(or a letter avatar when no portrait is given), the speaker name as an `h3`,
and the dialogue as `body-1` secondary text.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `speakerName` | `string` | — | name shown as the heading (required) |
| `portrait` | `ReactNode` | — | custom portrait node; letter avatar if absent |
| `text` | `string` | — | dialogue body (required) |
| `onContinue` | `() => void` | — | renders the Continue button when provided |
| `className` | `string` | — | extra classes |
| `bindings` | `Record<string, string>` | — | serialized as `data-bindings` |

## Usage notes

- The **Continue button renders only when `onContinue` is provided** — omit it
  for non-interactive story text or a quest-intro card.
- `portrait` is a React node, so pass any element (an `<img>`, an avatar
  component, an icon). Without it, the first letter of `speakerName` is shown.

## Examples

```tsx
// CORRECT — interactive NPC dialogue
<DialogueBox speakerName="Villager" text="Welcome!" onContinue={next} />

// CORRECT — static story intro, no button
<DialogueBox speakerName="Narrator" text="The forest grows dark..." />
```

```tsx
// WRONG — raw div + styled button with hex colors
<div className="flex p-4 bg-[#131A24]">
  <button style={{ backgroundColor: '#22C55E' }}>Continue</button>
</div>
```

Why wrong: hardcoded surface and button colors bypass the token system, and the
button renders unconditionally instead of only when `onContinue` is set.

## Decision tree

```
Is this NPC speech / story text?
│
├─ No → another component fits better (SkillBar for hotkeys, etc.)
└─ Yes → DialogueBox
         │
         ├─ Have a portrait image? → portrait={<img ... />}
         └─ No portrait?           → omit (letter avatar)
         │
         ├─ Can the player advance? → onContinue={handler}
         └─ Static text only       → omit onContinue (no button)
```
