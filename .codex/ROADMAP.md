# Glyphe Roadmap

Glyphe is a registry-first, CSS-first toolkit for terminal-inspired text animations on the web.

The goal is not to clone an existing spinner package. Glyphe should become a modern developer tooling ecosystem for copy-paste animation primitives: unicode spinners, ASCII loaders, progress indicators, glitch effects, typing effects, matrix-style effects, and animated text utilities.

The product should feel modern, lightweight, aesthetic, highly customizable, and friendly to developers who want to own the generated code.

## Product Direction

Glyphe should follow the spirit of shadcn/ui:

- users copy or install source code they can own
- animations are described in a registry
- generated output is readable and customizable
- CSS is the primary runtime when possible
- React components are generated adapters, not the source of truth
- Tailwind integration is first-class without requiring Tailwind
- a CLI can be added later once the registry format is stable

The core product is a website with a gallery, playground, generator, registry, and eventually a CLI.

## Stack

Initial stack:

- Vite
- React
- TypeScript
- TanStack Router
- Tailwind CSS
- Bun
- Zod
- Vitest
- Biome

Potential future additions:

- Motion for website polish only
- CLI package
- Tailwind plugin
- framework adapters for Vue, Svelte, or Solid
- visual regression testing

## Core Architecture

Glyphe should be registry-first.

The registry is the source of truth for:

- gallery pages
- live previews
- generated CSS
- generated React components
- generated Tailwind-compatible CSS
- accessibility notes
- future CLI installs

The website should consume registry data instead of hand-maintaining duplicate docs, examples, and generated snippets.

## Suggested Initial Structure

Start simple, but keep the boundaries ready for extraction into packages later.

```txt
glyphe/
  src/
    components/
      animation-preview.tsx
      code-block.tsx
      copy-button.tsx
      site-header.tsx
      controls/

    generator/
      css.ts
      react.ts
      tailwind.ts
      validate.ts

    lib/
      cn.ts

    registry/
      schema.ts
      index.ts
      items/
        spinner-braille.ts
        spinner-dots.ts
        loader-waveform.ts

    routes/
      __root.tsx
      index.tsx
      gallery.tsx
      gallery.$slug.tsx
      generator.tsx

    styles/
      globals.css
      glyphe.css

  public/
  package.json
  vite.config.ts
  tsconfig.json
```

Later monorepo shape:

```txt
apps/
  web/

packages/
  core/
  registry/
  generator/
  react/
  tailwind/
  cli/
```

## Registry Model

Each animation should be represented by structured data, not just a handwritten code snippet.

Example conceptual shape:

```ts
type GlypheRegistryItem = {
  name: string
  slug: string
  category: "spinner" | "loader" | "progress" | "text" | "matrix" | "cursor"
  description: string
  tags: string[]

  frames?: string[]
  duration: number
  timing: "steps" | "linear" | "ease" | "custom"
  loop: boolean

  strategy:
    | "stacked-spans"
    | "css-var-swap"
    | "pseudo-content"
    | "transform"
    | "scripted"

  accessibility: {
    decorative: boolean
    defaultLabel?: string
    reducedMotion: "first-frame" | "static-label" | "disabled" | "slowed"
    ariaHiddenRecommended: boolean
  }

  compatibility: {
    requiresMonospace: boolean
    unicodeSensitive: boolean
    supportsCssOnly: boolean
  }

  options: {
    speed?: {
      default: number
      min: number
      max: number
    }
    size?: string[]
    color?: string[]
  }
}
```

The first schema should be practical, not exhaustive. Add fields when the generator or gallery actually needs them.

## Rendering Strategy

Do not rely entirely on animating CSS `content`.

Preferred default: stacked real DOM spans.

This strategy renders all frames as actual text, stacks them in the same grid cell, and swaps visibility with CSS animations.

Benefits:

- predictable DOM
- easier debugging
- better accessibility control
- avoids overreliance on generated content
- works well for unicode frame animations

Other strategies:

- `pseudo-content`: compact, useful for simple generated snippets, but needs accessibility caution
- `css-var-swap`: useful for utility-style output
- `transform`: useful for bars, waves, progress indicators, and cursor effects
- `scripted`: appropriate for typewriter, scramble, matrix rain, and effects needing dynamic text

## Accessibility Principles

Each animation must define its accessibility behavior.

Core rules:

- decorative animations should use `aria-hidden="true"`
- loading/status animations need a stable accessible label
- text effects must preserve readable text
- reduced-motion support is required
- long-running or prominent motion should be pausable or replaceable
- avoid rapid flashing

Reduced motion defaults:

- spinners: show first frame
- loaders: show static label or first frame
- progress: show static value
- typewriter/scramble: show final text
- matrix/glitch: disable or heavily reduce motion

## Unicode And Font Risks

Unicode rendering is a central technical risk.

Known risks:

- glyph widths vary across fonts and operating systems
- emoji may render as colored double-width glyphs
- some symbols are missing from common fonts
- combining characters can break alignment
- font fallback can cause visual jitter
- line-height and vertical metrics vary

Mitigations:

- prefer stable unicode sets in the default gallery
- mark risky entries in registry metadata
- recommend monospace font stacks
- use fixed `ch` dimensions where appropriate
- use `inline-grid` for stacked frames
- disable ligatures for terminal-style text
- include font/rendering notes in gallery detail pages
- avoid emoji in the initial MVP

## Tailwind Integration

Tailwind support should happen in layers.

Phase 1:

- generate regular CSS that works inside Tailwind projects
- provide className examples
- use Tailwind-friendly variables and selectors

Phase 2:

- generate Tailwind v4-compatible `@theme` animation definitions
- generate utilities that users can paste into their stylesheet

Phase 3:

- add an optional `@glyphe/tailwind` plugin
- allow users to enable specific registry animations
- avoid making Tailwind mandatory

## Future CLI

The CLI should be added after the registry and generator are stable.

Potential commands:

```sh
bunx glyphe init
bunx glyphe add spinner/braille
bunx glyphe add loader/waveform --react
bunx glyphe add text/typewriter --tailwind
bunx glyphe registry list
bunx glyphe generate --frames "⠋ ⠙ ⠹ ⠸ ⠼"
```

CLI responsibilities:

- detect project framework
- detect Tailwind usage
- read Glyphe config
- copy generated files into user-owned paths
- preserve user edits
- support local and remote registries later
- avoid installing runtime dependencies unless needed

Potential config:

```json
{
  "$schema": "https://glyphe.dev/schema.json",
  "style": "default",
  "tsx": true,
  "tailwind": true,
  "paths": {
    "components": "src/components/glyphe",
    "css": "src/styles/glyphe.css"
  }
}
```

## MVP Scope

The MVP should prove the product loop:

1. Browse an animation.
2. Preview it live.
3. Customize basic options.
4. Copy generated CSS.
5. Copy generated React.
6. Copy Tailwind-compatible CSS.
7. Understand accessibility and rendering tradeoffs.

Initial pages:

- home
- gallery
- animation detail
- generator

Initial animation set:

- `spinner/braille`
- `spinner/dots`
- `spinner/line`
- `spinner/clock`
- `loader/waveform`
- `loader/bars`
- `progress/ascii`
- `progress/blocks`
- `text/typewriter`
- `text/glitch-soft`
- `text/scramble`
- `cursor/block`

Defer matrix rain until after the core CSS/registry story is strong.

## Milestones

### Milestone 1: Project Foundation

- scaffold Vite, React, TypeScript, and TanStack Router
- configure Tailwind CSS
- configure Biome
- configure Vitest
- create base layout and routes
- create initial design tokens
- create registry schema with Zod

Exit criteria:

- app runs locally
- routes are in place
- styling foundation exists
- registry schema can validate at least one animation

### Milestone 2: Registry And Generator Core

- create initial registry entries
- implement CSS generator
- implement React component generator
- implement Tailwind CSS generator
- add validation for frame input
- add tests for generated output

Exit criteria:

- registry entries can generate CSS, React, and Tailwind snippets
- generator output is deterministic
- basic test coverage exists

### Milestone 3: Gallery

- build gallery page
- add category filters
- add preview cards
- add animation detail pages
- add copy buttons
- display accessibility notes
- display compatibility notes

Exit criteria:

- users can browse all MVP animations
- each animation has a live preview and copyable code
- docs are generated from registry data

### Milestone 4: Generator Page

- build frame input editor
- add speed controls
- add timing controls
- add live preview
- add output tabs for CSS, React, and Tailwind
- add reduced-motion preview toggle
- add warnings for risky glyphs

Exit criteria:

- users can paste custom frames and export usable code
- invalid input produces helpful messages
- generated previews match copied output

### Milestone 5: Accessibility And Rendering Hardening

- audit generated markup
- audit reduced-motion behavior
- add accessibility examples
- add font rendering notes
- add stable dimensions for previews
- test across light and dark themes

Exit criteria:

- animations have documented accessibility modes
- reduced-motion output is included by default
- previews are visually stable

### Milestone 6: Website Polish

- refine visual identity
- improve homepage
- add docs for registry concepts
- add docs for generated code ownership
- add examples for common UI usage
- add responsive QA

Exit criteria:

- site feels like a real developer tool
- first-time users understand the product in under a minute
- generated code remains the main call to action

### Milestone 7: CLI Prototype

- create CLI package
- implement `init`
- implement `add`
- read local registry data
- write generated files
- add dry-run mode

Exit criteria:

- CLI can install at least one animation into a test Vite project
- generated files match website output
- user-owned code remains readable

## Design Direction

Glyphe should feel like a focused developer tool, not a novelty terminal skin.

Guidelines:

- use terminal influence through typography, spacing, and motion
- avoid fake terminal windows everywhere
- avoid heavy neon cyberpunk styling
- support excellent light and dark themes
- keep UI dense but calm
- make previews feel delightful without distracting from code
- prioritize copy/export workflows

The visual target is closer to a motion lab for developers than a marketing page.

## Early Non-Goals

Do not build these in the MVP:

- remote registry hosting
- CLI install flow
- Tailwind plugin
- matrix rain as a core primitive
- account system
- saved animations
- package publishing
- framework adapters beyond React
- complex visual editor

## Open Questions

- Should generated React components depend on a tiny helper package, or be fully standalone?
- Should registry entries live as TypeScript modules first, then export JSON later?
- Should animation previews use the generated output directly to avoid divergence?
- How much customization belongs in registry options versus the generator UI?
- Should Glyphe support npm package consumption at all, or stay strictly copy-paste?
- What is the right balance between CSS-only purity and pragmatic scripted effects?

## Guiding Principle

Glyphe should make text motion feel ownable.

Every architecture decision should support that: structured registry data, readable generated code, accessible defaults, reduced-motion support, and a beautiful interface that helps developers understand and customize what they are copying.
