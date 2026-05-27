# Glyphe Pivot Plan

## New Direction

Glyphe is pivoting from a mostly Unicode/text animation package into a typographic utility toolkit.

The new product boundary is text experience:

- Text animations
- Async text states
- Lightweight typography primitives
- Readability presets
- Accessibility-aware motion
- RTL-compatible text behavior

Glyphe should not become:

- A general UI library
- A full typography system
- A shadcn/ui replacement
- A broad component catalog

The first viable version should feel light, focused, and premium: a black-and-white, document-like website elevated by typography, rhythm, motion, and restraint.

## Current Codebase Summary

The current project already has several useful foundations:

- Vite, React, TypeScript, TanStack Router, Tailwind CSS, and Bun.
- A typed registry model in `src/registry/schema.ts`.
- Existing animation items in `src/registry/items`.
- Existing text presets: `text/typewriter`, `text/scramble`, `text/glitch-soft`, and `text/glitch-3d`.
- Frame parsing and validation in `src/generator/frames.ts`.
- CSS, React, and Tailwind generators in `src/generator`.
- Preview renderers in `src/components/animation`.
- A generator/playground route in `src/routes/generator.tsx`.
- Accessibility guidance in `src/lib/accessibility.ts`.
- Unicode/font compatibility guidance in `src/lib/unicode-compatibility.ts`.
- A small CLI/install structure in `cli`.

The main mismatch is conceptual: the current model is centered on registry-driven glyph/frame animations. The pivot needs a broader but still focused model for text primitives, reveal effects, async states, and typography recipes.

## Keep

- The frame parser and validation logic.
- The preview renderer ideas: stacked frames, scripted stepping, transform effects.
- The existing text animation presets as migration seeds.
- Reduced-motion handling.
- Accessibility and Unicode compatibility guidance.
- Small UI primitives used by the site and playground.
- The black-and-white token foundation in `src/index.css`.
- The CLI architecture as a later asset, not a first-version focus.

## Rename Or Reshape

- `AnimationPreview` -> `TextMotionPreview`.
- `Generator` route -> `Playground`.
- `Gallery` -> `Library`, or remove from first-version navigation.
- `RegistryItem` -> `MotionPreset` for animation-specific entries.
- `registryItems` -> split into `motionPresets`, `textRecipes`, and `asyncStates`.
- Product copy from "terminal-inspired text motion" to "typographic utility toolkit for text experience."

## Delete Or Park

These should not lead the first version:

- Most spinner, loader, progress, and cursor gallery emphasis.
- Matrix category unless a concrete first-version use appears.
- Detailed gallery pages if the first website is intentionally pure and focused.
- CLI promotion in docs/navigation.
- Tailwind generator as a headline feature.

Do not blindly delete old primitives at the start. Some can become loading glyphs or async text states. Park first, remove later when the new surface is stable.

## Target First Viable Version

Public components:

```tsx
<Text intent="paragraph" density="comfortable" />
<Text intent="quote" rhythm="editorial" />
<TextSkeleton lines={4} intent="paragraph" />
<TextReveal preset="decode">Hello world</TextReveal>
```

Core features:

- `TextReveal`
- `TextSkeleton`
- Typography recipe tokens
- Playground preview for text, font, speed, direction, and reduced motion

Initial reveal presets:

- `typewriter`
- `scramble`
- `decode`
- `glitch`
- `shimmer`

Initial async states:

- Skeleton paragraph
- Loading quote
- Placeholder title
- Progressive text reveal
- Streaming message

Initial recipes:

- Heading
- Paragraph
- Quote
- Note
- CodeText
- MutedText

Initial tokens:

```css
--glyphe-font-size-paragraph: 1rem;
--glyphe-line-height-paragraph: 1.65;
--glyphe-letter-spacing-heading: -0.02em;
--glyphe-measure-paragraph: 65ch;
```

## Proposed Architecture

```txt
src/
  glyphe/
    index.ts
    components/
      text.tsx
      text-reveal.tsx
      text-skeleton.tsx
    motion/
      frames.ts
      reveal-presets.ts
      use-text-motion.ts
      reduced-motion.ts
    typography/
      recipes.ts
      tokens.css
      types.ts
    async/
      skeleton.ts
      streaming.ts
    accessibility.ts
    unicode.ts

  registry/
    motion-presets.ts
    text-recipes.ts
    async-states.ts
    schema.ts

  components/
    preview/
      text-playground.tsx
      text-motion-preview.tsx
      typography-sample.tsx
    site/
    ui/

  routes/
    index.tsx
    playground.tsx
    docs.tsx
    examples.tsx
```

## Migration Phases

### Phase 1: Product Reset

- Update product language and site metadata.
- Rename or reframe the generator as a playground.
- Make the homepage feel like a premium black-and-white document.
- Down-rank old gallery/registry surfaces.
- Keep implementation changes minimal.

### Phase 2: First Toolkit Components

- Add `Text`.
- Add `TextReveal`.
- Add `TextSkeleton`.
- Add typography recipe tokens.
- Reuse frame and reduced-motion logic where it fits.
- Include accessible final-text behavior and direction support from the beginning.

### Phase 3: Rehome Existing Primitives

- Convert `text/typewriter`, `text/scramble`, and `text/glitch` into reveal presets.
- Convert selected loader/spinner ideas into loading glyphs or async text states.
- Move old terminal-first primitives out of the primary product surface.

### Phase 4: New Playground

- Controls: text, preset, font, speed, direction, reduced motion.
- Preview: `TextReveal`, `TextSkeleton`, and recipe samples.
- Keep the interface focused and editorial.
- Avoid making this feel like a general UI component configurator.

### Phase 5: Tests And Verification

- Unit-test reveal frame generation.
- Unit-test reduced-motion behavior.
- Unit-test skeleton line output.
- Unit-test recipe class/token mapping.
- Run lint, tests, and build.
- Verify the site visually after major frontend changes.

## Recommended First Edit Pass

Start with Phase 1 and Phase 2 only.

Goal: a lighter Glyphe with working `Text`, `TextReveal`, and `TextSkeleton`, plus a pure premium website direction. Preserve the reusable animation engine, registry structure, accessibility guidance, and Unicode compatibility logic while the new public surface takes shape.
