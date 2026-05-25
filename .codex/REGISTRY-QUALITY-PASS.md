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

- [ ] Review every current animation visually in light preview mode
- [ ] Review every current animation visually in dark preview mode
- [ ] Review every current animation with reduced motion enabled
- [ ] Mark animations that feel too similar
- [ ] Mark animations that feel too weak or noisy
- [ ] Mark animations that need a better name
- [ ] Mark animations that need a different category
- [ ] Mark animations that need a different rendering strategy
- [ ] Mark animations that should become generator-only examples
- [ ] Mark animations that should be removed before package extraction

## Registry-Wide Tasks

- [ ] Normalize animation naming rules
- [ ] Normalize slug naming rules
- [ ] Normalize family naming rules
- [ ] Normalize category usage
- [ ] Normalize tags used for filtering
- [ ] Replace broad `unicode` tags with more specific tags where possible
- [ ] Decide whether `decorative` belongs in metadata, UI, or nowhere
- [ ] Audit every description for clarity and usefulness
- [ ] Audit every accessibility label
- [ ] Audit every reduced-motion mode
- [ ] Audit every recommended font stack
- [ ] Audit every `requiresMonospace` value
- [ ] Audit every duration and timing value
- [ ] Audit every rendering strategy
- [ ] Audit every generated CSS variable option
- [ ] Decide which animations should appear as generator presets
- [ ] Decide which animations should be first-class CLI install targets

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
- [ ] `spinner/braille-breathe` - Braille Breathe
- [ ] `spinner/braille-snake` - Braille Snake
- [ ] `spinner/braille-fillsweep` - Braille Fillsweep
- [ ] `spinner/braille-diagswipe` - Braille Diagonal Swipe
- [ ] `spinner/braille-scan` - Braille Scan
- [ ] `spinner/braille-pulse` - Braille Pulse
- [ ] `spinner/braille-cascade` - Braille Cascade
- [ ] `spinner/braille-columns` - Braille Columns
- [ ] `spinner/braille-scanline` - Braille Scanline
- [ ] `spinner/braille-checkerboard` - Braille Checkerboard
- [ ] `spinner/braille-rain` - Braille Rain
- [ ] `spinner/braille-sparkle` - Braille Sparkle
- [ ] `spinner/braille-waverows` - Braille Wave Rows
- [ ] `spinner/braille-helix` - Braille Helix
- [ ] `spinner/braille-wave` - Braille Wave
- [ ] `spinner/braille-dna` - Braille DNA
- [ ] `spinner/braille-vortex` - Braille Vortex
- [ ] `spinner/braille-matrix` - Braille Matrix
- [ ] `spinner/braille-pingpong` - Braille Ping Pong
- [ ] `spinner/braille-tunnel` - Braille Tunnel
- [ ] `spinner/braille-binary` - Braille Binary
- [ ] `spinner/braille-ripple` - Braille Ripple

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
