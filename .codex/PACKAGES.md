# Glyphe Future Packages Plan

Glyphe should keep the website as the integration point until the registry, generators, and CLI workflows are stable. Package extraction should happen only when a boundary is proven by repeated use in the website, CLI, tests, or future adapters.

## Publishing Model

Recommended public packages:

- `glyphe`: executable CLI package
- `@glyphe/core`: shared types, config schema, and compatibility helpers
- `@glyphe/registry`: official bundled animation registry
- `@glyphe/generator`: CSS, React, and Tailwind string generators
- `@glyphe/react`: optional React runtime helpers/components, only if copy-paste output needs shared helpers
- `@glyphe/tailwind`: optional Tailwind plugin, only after pasteable Tailwind output is mature

The unscoped `glyphe` package should remain the user-facing CLI entry so `bunx glyphe add spinner/braille` works naturally.

## Extraction Order

1. `@glyphe/core`
2. `@glyphe/registry`
3. `@glyphe/generator`
4. `glyphe` CLI package
5. `@glyphe/react`, if needed
6. `@glyphe/tailwind`, if needed

Do not extract React or Tailwind packages first. They depend on stable core, registry, and generator contracts.

## `@glyphe/core`

Purpose:

- shared TypeScript types
- config schema
- slug helpers
- accessibility helpers
- unicode compatibility helpers
- small pure utilities used by registry, generator, website, and CLI

Candidate source modules:

- `src/registry/schema.ts`
- `src/registry/slug.ts`
- `src/lib/accessibility.ts`
- `src/lib/unicode-compatibility.ts`
- future `glyphe.config` schema

Should not include:

- React components
- route metadata
- website hooks
- registry item data
- filesystem code

Public API sketch:

```ts
export type RegistryItem
export type RenderingStrategy
export type GlypheConfig
export function createRegistrySlug(...)
export function getAccessibilityGuidance(...)
export function getUnicodeCompatibilityGuidance(...)
```

## `@glyphe/registry`

Purpose:

- official bundled registry items
- registry lookup helpers
- registry validation helpers
- future JSON export for remote registry hosting

Candidate source modules:

- `src/registry/items/*`
- `src/registry/index.ts`
- `src/registry/validation.ts`

Dependencies:

- depends on `@glyphe/core`

Should not include:

- generators
- website components
- CLI filesystem behavior

Public API sketch:

```ts
export const registryItems
export function getRegistryItem(slug: string)
export function requireRegistryItem(slug: string)
export function validateRegistry(items: unknown[])
```

## `@glyphe/generator`

Purpose:

- generate CSS output
- generate React component source
- generate Tailwind-friendly CSS
- parse frame input
- provide deterministic code generation APIs for website and CLI

Candidate source modules:

- `src/generator/css.ts`
- `src/generator/react.ts`
- `src/generator/tailwind.ts`
- `src/generator/frames.ts`

Dependencies:

- depends on `@glyphe/core`
- may depend on `@glyphe/registry` for examples/tests, but generation APIs should accept registry items directly

Should not include:

- React runtime components
- DOM preview renderers
- filesystem writes
- CLI argument parsing

Public API sketch:

```ts
export function generateCss(item, options?)
export function generateReactComponent(item, options?)
export function generateTailwindCss(item, options?)
export function parseFrames(input: string)
```

## `@glyphe/react`

Purpose:

- optional React helpers for users who want a tiny package instead of fully standalone copied code
- shared preview/runtime primitives only if they avoid meaningful duplication

Candidate source modules:

- maybe `src/components/animation/*`
- maybe a future `GlypheAnimation` primitive

Dependencies:

- peer dependency on `react`
- may depend on `@glyphe/core`

Default stance:

- defer this package
- keep generated React standalone for MVP
- avoid forcing runtime dependencies on copy-paste users

Public API sketch if needed:

```ts
export function StackedSpansAnimation(...)
export function ScriptedTextAnimation(...)
```

## `@glyphe/tailwind`

Purpose:

- optional Tailwind plugin for projects that want registry animations as Tailwind utilities
- enable selected registry items from config

Dependencies:

- depends on `@glyphe/core`
- may depend on `@glyphe/generator`
- peer dependency on Tailwind only when plugin APIs require it

Default stance:

- defer this package
- prioritize pasteable Tailwind v4 `@theme` output first
- add plugin only after repeated demand

Public API sketch if needed:

```ts
import glyphe from "@glyphe/tailwind"

export default {
  plugins: [
    glyphe({
      animations: ["spinner/braille", "loader/waveform"]
    })
  ]
}
```

## `glyphe` CLI Package

Purpose:

- executable package for `bunx glyphe ...`
- read config
- resolve registry items
- call generator APIs
- write user-owned files safely
- support dry-run and conflict detection

Candidate source modules:

- `cli/index.ts`
- `cli/local-install.ts`
- future command modules from `.codex/CLI.md`

Dependencies:

- depends on `@glyphe/core`
- depends on `@glyphe/registry`
- depends on `@glyphe/generator`

Should not include:

- website code
- React preview components
- Tailwind plugin implementation

Public behavior:

```sh
bunx glyphe init
bunx glyphe add spinner/braille
bunx glyphe add text/typewriter --tailwind
bunx glyphe registry list
```

## Monorepo Shape

Future structure:

```txt
apps/
  web/

packages/
  core/
  registry/
  generator/
  cli/
  react/
  tailwind/
```

The current repo can remain single-app until package extraction creates more value than maintenance cost.

## Extraction Criteria

Extract a package when at least two of these are true:

- the website and CLI both import the same module boundary
- tests need a stable public API around the boundary
- generated output depends on a stable contract
- future adapters need the boundary
- publishing the package unlocks a real user workflow

Do not extract only for neatness.
