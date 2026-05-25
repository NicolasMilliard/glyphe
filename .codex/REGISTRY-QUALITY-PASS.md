# Registry Quality Pass

## Goal

Make every registry item feel intentional, searchable, accessible, and ready to
feed the gallery, detail pages, generator presets, docs, and future CLI.

## Working Principles

- Prefer clear names over clever names.
- Avoid duplicate meaning in titles, families, and tags.
- Keep descriptions short, visual, and useful.
- Tags should power discovery; remove tags that are not useful filters.
- Every item needs a believable use case.
- Accessibility metadata should match how the animation is actually used.
- Compatibility metadata should be honest about fonts, width, and Unicode risk.

## First Step: User Visual Review

Use this pass to decide what should be kept, removed, renamed, or adjusted after
looking at the actual gallery and detail pages.

- [x] Review every current animation visually in light preview mode
- [x] Review every current animation visually in dark preview mode
- [x] Review every current animation with reduced motion enabled
- [x] Mark animations that feel too similar
- [x] Mark animations that feel too weak or noisy
- [x] Mark animations that need a better name
- [x] Mark animations that need a different category
- [x] Mark animations that need a different rendering strategy
- [x] Mark animations that should become generator-only examples
- [x] Mark animations that should be removed before package extraction

### Round 1 Final Decisions

- [x] Keep all retained animations visible in the gallery for now
- [x] Do not move any retained animation to another category in this round
- [x] Do not make any retained animation generator-only in this round
- [x] Keep braille variants as `spinner` items until a broader taxonomy pass
- [x] Keep `text/glitch-3d` in the `text` category
- [x] Use a specialized transform rendering path for `text/glitch-3d`
- [x] Keep `spinner/braille-rain` after reworking it into a calmer droplet/rest loop
- [x] Keep `spinner/braille-dna` slug for continuity, but display it as `Braille Twist`
- [x] Use `cursor/braille` as the slug for the new braille cursor
- [x] Defer deeper reduced-motion visual QA to the registry-wide accessibility audit

## Visual Review Notes - Round 1

### Keep

- [x] Keep `spinner/braille` as-is
  - Looks good in light and dark themes.
  - Name is understandable.
- [x] Keep `spinner/braille-fill-sweep`
  - Animation feels strong.
  - Rename because `Fillsweep` is not immediately clear.
- [x] Keep `spinner/braille-checkerboard`
  - Animation feels good.
  - Reduce blinkiness if possible, ideally with interval/rest frames.

### Rework

- [x] Rework `spinner/braille-orbit`
  - Current loop has a visible jump.
  - Current frames: `⠁ ⠂ ⠄ ⡀ ⠠ ⠐ ⠈ ⠁`
  - Add a step between `⡀` and `⠠`, ideally a bottom-right dot.
- [x] Rework `spinner/braille-snake`
  - New proposed frames: `⠁ ⠉ ⠙ ⠛ ⠟ ⠿`
  - Should feel like a snake progressing in a zig-zag.
- [x] Rework `spinner/braille-scan`
  - New proposed frames: `⠇ ⠿ ⠸ ⠿`
- [x] Rework `spinner/braille-pulse`
  - New proposed frames: `⠁ ⠛ ⠿ ⣿ ⠿ ⠛ ⠁`
- [x] Rework `spinner/braille-cascade`
  - New proposed frames: `⠉ ⠛ ⠿ ⣿`
- [x] Rework `spinner/braille-rain`
  - Starting idea: `⠉ ⠒ ⠤`
  - Still needs improvement before keeping.
- [x] Rework `spinner/braille-sparkle`
  - Consider renaming to `Fireworks`.
  - Rework animation so the name and motion match.
- [x] Rework `spinner/braille-wave`
  - New proposed frames: `⠁ ⠉ ⠙ ⠹ ⠽ ⠿ ⠾ ⠶ ⠦ ⠆ ⠂`
  - Rename to `Wave`.
  - Remove the current `spinner/braille-wave` item to avoid duplicate meaning.
- [x] Rework `loader/bars`
  - Current animation has a small visual issue.
- [x] Add another cursor animation
  - Proposed frames: `⡇ ⣿`
- [x] Add `3D Glitch` text effect
  - Red and blue offset effect inspired by old 3D glasses.

### Rename

- [x] Rename `spinner/braille-fillsweep` to `spinner/braille-fill-sweep`
  - Animation is good, name is not clear enough.
- [x] Rename `spinner/braille-sparkle`
  - Candidate: `Fireworks`.
- [x] Rename `spinner/braille-waverows` to `spinner/braille-wave`
  - Candidate: `Wave`.
- [x] Rename `spinner/braille-dna`
  - Current name should change if kept.

### Remove

- [x] Remove `spinner/braille-breathe`
  - Name feels weird.
  - Use case is not obvious.
- [x] Remove `spinner/braille-diagswipe`
- [x] Remove `spinner/braille-columns`
- [x] Remove `spinner/braille-scanline`
- [x] Remove `spinner/braille-helix`
- [x] Remove `spinner/braille-wave`
  - Replace with renamed/reworked `spinner/braille-waverows`.
- [x] Remove `spinner/braille-vortex`
- [x] Remove `spinner/braille-pingpong`
- [x] Remove `spinner/braille-tunnel`
- [x] Remove `spinner/braille-binary`
- [x] Remove `spinner/braille-ripple`

### Open Questions

- [x] Decide whether reworked `spinner/braille-rain` is strong enough to keep
- [x] Decide final name for `spinner/braille-fillsweep`
- [x] Decide final name for `spinner/braille-dna`
- [x] Decide whether `3D Glitch` belongs in `text` or a future `effect` family
- [x] Decide slug for the new cursor animation

## Registry-Wide Tasks

- [x] Normalize animation naming rules
- [x] Normalize slug naming rules
- [x] Normalize family naming rules
- [x] Normalize category usage
- [x] Normalize tags used for filtering
- [x] Replace broad `unicode` tags with more specific tags where possible
- [x] Decide whether `decorative` belongs in metadata, UI, or nowhere
- [x] Audit every description for clarity and usefulness
- [x] Audit every accessibility label
- [x] Audit every reduced-motion mode
- [x] Audit every recommended font stack
- [x] Audit every `requiresMonospace` value
- [x] Audit every duration and timing value
- [x] Audit every rendering strategy
- [x] Audit every generated CSS variable option
- [x] Decide which animations should appear as generator presets
- [x] Decide which animations should be first-class CLI install targets

### Registry-Wide Decisions

- [x] Names should use readable display labels and avoid repeating the category
      except where the phrase is naturally understood.
- [x] Slugs stay stable once published; `spinner/braille-dna` keeps its slug but
      displays as `Braille Twist`.
- [x] Family remains tag-derived for now; no schema field is added until the
      taxonomy needs more than `braille`, `ascii`, `blocks`, `glitch`, etc.
- [x] Categories remain `spinner`, `loader`, `progress`, `cursor`, and `text`
      for the retained items.
- [x] Tags should describe discovery traits, not broad implementation buckets;
      broad `unicode` tags were replaced with `braille`, `blocks`, `symbol`, or
      other concrete tags.
- [x] `decorative` stays in accessibility metadata because generated React and
      detail guidance need it.
- [x] Every item now carries explicit glyph width, Unicode risk, emoji risk, and
      recommended font stack metadata.
- [x] Generator presets are curated in `src/registry/presets.ts`.
- [x] First-class future CLI install targets are curated in
      `src/registry/presets.ts`.

## Current Animation Checklist

### Cursor

- [ ] `cursor/block` - Block Cursor
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

- [ ] `cursor/braille` - Braille Cursor
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

### Loaders

- [ ] `loader/bars` - Bars Loader
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

- [ ] `loader/waveform` - Waveform Loader
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

### Progress

- [ ] `progress/ascii` - ASCII Progress
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

- [ ] `progress/blocks` - Block Progress
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

### Spinners

- [ ] `spinner/braille` - Braille Spinner
  - [ ] Keep, remove, or update
  - [ ] Review display name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

- [ ] `spinner/clock` - Clock Spinner
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

- [ ] `spinner/dots` - Dots Spinner
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

- [ ] `spinner/line` - Line Spinner
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

### Braille Spinner Variants

- [ ] `spinner/braille-orbit` - Braille Orbit
- [ ] `spinner/braille-snake` - Braille Snake
- [ ] `spinner/braille-fill-sweep` - Braille Fill Sweep
- [ ] `spinner/braille-scan` - Braille Scan
- [ ] `spinner/braille-pulse` - Braille Pulse
- [ ] `spinner/braille-cascade` - Braille Cascade
- [ ] `spinner/braille-checkerboard` - Braille Checkerboard
- [ ] `spinner/braille-rain` - Braille Rain
- [ ] `spinner/braille-sparkle` - Braille Fireworks
- [ ] `spinner/braille-wave` - Braille Wave
- [ ] `spinner/braille-dna` - Braille Twist
- [ ] `spinner/braille-matrix` - Braille Matrix

For each braille variant:

- [ ] Decide if it is visually distinct enough
- [ ] Decide if the name matches the motion
- [ ] Decide if it should stay in the gallery
- [ ] Decide if it should be hidden from default generator presets
- [ ] Review duration against perceived motion
- [ ] Review whether tags add meaningful discovery value
- [ ] Review if family/detail related animations remain useful

### Text Effects

- [ ] `text/glitch-soft` - Soft Glitch Text
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

- [ ] `text/glitch-3d` - 3D Glitch Text
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

- [ ] `text/scramble` - Scramble Text
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

- [ ] `text/typewriter` - Typewriter Text
  - [ ] Keep, remove, or update
  - [ ] Review name
  - [ ] Review description
  - [ ] Review tags
  - [ ] Review accessibility mode
  - [ ] Review reduced-motion behavior
  - [ ] Review rendering strategy

## Suggested Review Outputs

Use these labels when reviewing items:

- [ ] Keep as-is
- [ ] Keep with copy update
- [ ] Keep with metadata update
- [ ] Keep with rendering update
- [ ] Rename
- [ ] Move category
- [ ] Hide from default gallery
- [ ] Hide from generator presets
- [ ] Remove

## Definition Of Done

- [ ] Every animation has an explicit keep/remove/update decision
- [ ] Every retained animation has reviewed name, description, tags, and metadata
- [ ] Gallery filters remain useful after tag cleanup
- [ ] Detail pages read consistently across all categories
- [ ] Generator presets use only the strongest representative animations
- [ ] Registry tests pass
