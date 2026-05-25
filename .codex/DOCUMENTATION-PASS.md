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

- [x] Define docs landing structure
- [x] Add or refine side navigation
- [x] Group pages by user intent
- [ ] Make docs reachable from gallery detail pages
- [ ] Make registry metadata reachable from detail pages
- [x] Keep examples page linked from docs

## Slice 1: Docs Information Architecture

- [x] Group docs navigation into Start, Use Safely, and Extend
- [x] Add direct docs links to Gallery, Generator, and Examples
- [x] Add a Generator Output section
- [x] Keep copy concise and grounded in current shipped behavior
- [ ] Add detail-page documentation hooks in a later slice

## Core Pages

- [x] Introduction
  - [x] Explain Glyphe in one paragraph
  - [x] Explain copy/paste ownership
  - [x] Explain website, generator, registry, and future CLI

- [x] Installation And Usage
  - [x] Explain copy CSS flow
  - [x] Explain copy React flow
  - [x] Explain copy Tailwind flow
  - [x] Explain future CLI flow without promising shipped behavior

- [x] Rendering Strategies
  - [x] Explain stacked spans
  - [x] Explain CSS variable swap
  - [x] Explain pseudo content
  - [x] Explain transform effects
  - [x] Explain scripted previews versus generated output
  - [x] Add strategy selection guidance

## Slice 2: Usage And Rendering Content

- [x] Add Installation and Usage section
- [x] Add copy CSS guidance
- [x] Add copy React guidance
- [x] Add copy Tailwind guidance
- [x] Add CLI wording that does not promise shipped behavior
- [x] Add practical rendering strategy selection guidance

- [x] Accessibility
  - [x] Explain decorative animations
  - [x] Explain status/loading animations
  - [x] Explain text effects
  - [x] Explain stable labels
  - [x] Explain reduced-motion behavior
  - [x] Explain pause controls

- [x] Unicode Compatibility
  - [x] Explain font fallback risk
  - [x] Explain monospace alignment
  - [x] Explain emoji/text presentation risk
  - [x] Explain braille rendering caveats
  - [x] Explain testing across OS/browser/font stacks

## Slice 3: Accessibility And Unicode Content

- [x] Add practical accessibility mode selection guidance
- [x] Add stable label guidance for CSS and React copies
- [x] Add reduced-motion meaning-preservation guidance
- [x] Add pause, focus, and screen reader test guidance
- [x] Add braille and block glyph compatibility guidance
- [x] Add browser/font/background compatibility checklist

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
