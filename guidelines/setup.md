# Setup

## CSS imports

Import the master stylesheet once in App.tsx (or the consuming entry file):

```tsx
import '../styles/index.css'
```

Do not add additional stylesheet imports per component — index.css wires up the whole kit.

## Dependencies

- react: ^18
- tailwindcss: ^4
- tw-animate-css

Install with the project's package manager, then confirm tailwindcss resolves to v4 (the v4 engine is required for the `@theme` token block).

## Build config

Use Vite with the `@tailwindcss/vite` plugin. See vite.config.ts for the reference setup:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## Tokens

The `@theme` token block in src/styles/tailwind.css is the single source of truth for colors, spacing, and typography.

- Do not redefine tokens in component files.
- Reference tokens only through Tailwind utility classes (bg-surface, p-4, text-h1).
- If a value you need has no token, add the token to the `@theme` block first, then use it — never hardcode a raw value in JSX or CSS.
