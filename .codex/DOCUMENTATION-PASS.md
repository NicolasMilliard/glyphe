# Documentation Pass

## Goal

Make Glyphe understandable as a developer tool: what it is, why copy/paste
ownership matters, how rendering strategies work, and how users should choose
safe, accessible text animations.

## Principles

- Docs should be practical before exhaustive.
- Keep language calm, direct, and product-like.
- Use examples that match real interface work.
- Avoid explaining implementation details before the user needs them.
- Link docs back to gallery items and generator outputs when useful.

## Information Architecture

- [ ] Define docs landing structure
- [ ] Add or refine side navigation
- [ ] Group pages by user intent
- [ ] Make docs reachable from gallery detail pages
- [ ] Make registry metadata reachable from detail pages
- [ ] Keep examples page linked from docs

## Core Pages

- [ ] Introduction
  - [ ] Explain Glyphe in one paragraph
  - [ ] Explain copy/paste ownership
  - [ ] Explain website, generator, registry, and future CLI

- [ ] Installation And Usage
  - [ ] Explain copy CSS flow
  - [ ] Explain copy React flow
  - [ ] Explain copy Tailwind flow
  - [ ] Explain future CLI flow without promising shipped behavior

- [ ] Rendering Strategies
  - [ ] Explain stacked spans
  - [ ] Explain CSS variable swap
  - [ ] Explain pseudo content
  - [ ] Explain transform effects
  - [ ] Explain scripted previews versus generated output
  - [ ] Add strategy selection guidance

- [ ] Accessibility
  - [ ] Explain decorative animations
  - [ ] Explain status/loading animations
  - [ ] Explain text effects
  - [ ] Explain stable labels
  - [ ] Explain reduced-motion behavior
  - [ ] Explain pause controls

- [ ] Unicode Compatibility
  - [ ] Explain font fallback risk
  - [ ] Explain monospace alignment
  - [ ] Explain emoji/text presentation risk
  - [ ] Explain braille rendering caveats
  - [ ] Explain testing across OS/browser/font stacks

- [ ] Tailwind Usage
  - [ ] Explain generated theme tokens
  - [ ] Explain utility classes
  - [ ] Explain CSS variables for duration and width
  - [ ] Explain how to override safely

- [ ] Registry
  - [ ] Explain registry item anatomy
  - [ ] Explain categories, families, tags, and metadata
  - [ ] Explain how future CLI installs will use registry entries

- [ ] Generator
  - [ ] Explain frame input
  - [ ] Explain timing, duration, loop, and strategy controls
  - [ ] Explain generated CSS, React, and Tailwind outputs
  - [ ] Explain when custom animations should become local code

## Detail Page Documentation Hooks

- [ ] Add a concise "When to use this" note per item
- [ ] Add a concise "Accessibility" note per item
- [ ] Add a concise "Compatibility" note per item
- [ ] Link detail pages to relevant docs sections
- [ ] Link generated output sections to relevant docs sections

## Content Quality Checklist

- [ ] Replace vague claims with concrete guidance
- [ ] Avoid repeated paragraphs across pages
- [ ] Keep headings scannable
- [ ] Keep code snippets short
- [ ] Use the same naming as registry metadata
- [ ] Avoid future-tense promises for unbuilt CLI/package features

## Definition Of Done

- [ ] Docs explain the product without needing the roadmap
- [ ] Docs support the gallery, generator, and future CLI direction
- [ ] Accessibility guidance is consistent with registry metadata
- [ ] Unicode guidance is visible before users copy risky animations
- [ ] Navigation makes the docs feel like a real developer resource
