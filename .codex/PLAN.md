# Glyphe Plan

A small-action implementation checklist for Glyphe. Treat each item like a Linear ticket title: focused, independently understandable, and easy to pick up later.

## Current Focus

- [x] Scaffold Vite React TypeScript app
- [x] Install Tailwind CSS
- [x] Install TanStack Router
- [x] Wire TanStack Router into Vite
- [x] Create root route
- [x] Create home route
- [x] Create base app layout

## Foundation

- [x] Add `src/lib/cn.ts`
- [x] Add path aliases
- [x] Decide formatting setup
- [x] Configure Prettier
- [x] Configure Tailwind class sorting
- [x] Review ESLint defaults
- [x] Add project metadata to `README.md`
- [x] Add basic document titles
- [x] Add favicon references
- [x] Add route-level not found page
- [x] Add root error boundary

## Design System

- [x] Define color tokens
- [x] Define typography tokens
- [x] Define spacing rhythm
- [x] Define border radius rules
- [x] Define focus ring style
- [x] Add light theme
- [x] Add dark theme
- [x] Add theme CSS variables
- [x] Create button primitive
- [x] Create icon button primitive
- [x] Create input primitive
- [x] Create textarea primitive
- [x] Create select primitive
- [x] Create tabs primitive
- [x] Create segmented control primitive
- [x] Create tooltip primitive
- [x] Create copy button primitive

## Site Shell

- [x] Create site header
- [x] Create site navigation
- [x] Create mobile navigation
- [x] Create page container
- [x] Create docs content wrapper
- [x] Create footer
- [x] Add active nav state
- [x] Add responsive layout checks

## Routes

- [x] Create gallery route
- [x] Create animation detail route
- [x] Create generator route
- [x] Create docs route
- [x] Create registry route
- [x] Create examples route
- [x] Add route metadata model
- [x] Add breadcrumb helper

## Registry Core

- [x] Add registry folder
- [x] Add registry schema
- [x] Add animation category enum
- [x] Add rendering strategy enum
- [x] Add accessibility metadata schema
- [x] Add compatibility metadata schema
- [x] Add registry index
- [x] Add registry validation helper
- [x] Add registry slug helper
- [x] Add registry lookup helper
- [x] Add duplicate slug check
- [x] Add first spinner registry item

## Initial Registry Items

- [x] Add braille spinner
- [x] Add dots spinner
- [x] Add line spinner
- [x] Add clock spinner
- [x] Add waveform loader
- [x] Add bars loader
- [x] Add ASCII progress
- [x] Add block progress
- [x] Add block cursor
- [x] Add soft glitch text
- [x] Add typewriter text
- [x] Add scramble text

## Animation Rendering

- [x] Create stacked spans renderer
- [x] Create transform renderer
- [x] Create scripted renderer placeholder
- [x] Create preview renderer switch
- [x] Add fixed preview dimensions
- [x] Add monospace preview mode
- [x] Add reduced motion preview mode
- [x] Add animation speed override
- [x] Add animation pause control

## CSS Generator

- [x] Create CSS generator entry
- [x] Generate class names
- [x] Generate keyframe names
- [x] Generate stacked span CSS
- [x] Generate transform CSS
- [x] Generate reduced motion CSS
- [x] Generate CSS variables
- [x] Escape generated identifiers
- [x] Add CSS generator tests
- [x] Add generated CSS snapshots

## React Generator

- [x] Create React generator entry
- [x] Generate component names
- [x] Generate component props
- [x] Generate stacked span markup
- [x] Generate accessible label markup
- [x] Generate decorative mode
- [x] Generate status mode
- [x] Generate reduced motion notes
- [x] Add React generator tests
- [x] Add generated React snapshots

## Tailwind Generator

- [x] Create Tailwind generator entry
- [x] Generate Tailwind-friendly CSS
- [x] Generate `@theme` animation output
- [x] Generate utility examples
- [x] Generate className examples
- [x] Add Tailwind generator tests
- [x] Add generated Tailwind snapshots

## Gallery

- [x] Create gallery page layout
- [x] Create gallery filter controls
- [x] Create category tabs
- [x] Create animation card
- [x] Add live preview to cards
- [x] Add copy CSS action
- [x] Add copy React action
- [x] Add copy Tailwind action
- [x] Add accessibility badge
- [x] Add compatibility badge
- [x] Add empty filter state

## Animation Detail

- [x] Create detail page layout
- [x] Create large animation preview
- [x] Create preview controls
- [x] Create code tabs
- [x] Create CSS output panel
- [x] Create React output panel
- [x] Create Tailwind output panel
- [x] Add accessibility notes section
- [x] Add compatibility notes section
- [x] Add customization notes section
- [x] Add related animations section

## Generator Page

- [x] Create generator page layout
- [x] Create frame input textarea
- [x] Parse whitespace-separated frames
- [x] Parse newline-separated frames
- [x] Add frame count display
- [x] Add duration control
- [x] Add timing control
- [x] Add loop toggle
- [x] Add rendering strategy control
- [x] Add live generated preview
- [x] Add output tabs
- [x] Add validation messages
- [x] Add glyph risk warnings
- [x] Add reset example action

## Accessibility

- [x] Define accessibility modes
- [x] Add screen reader label helper
- [x] Add decorative animation pattern
- [x] Add status animation pattern
- [x] Add text effect accessibility pattern
- [x] Add reduced motion generator helper
- [x] Add pause guidance
- [x] Add flashing risk guidance
- [x] Add accessibility docs page

## Unicode Compatibility

- [x] Add glyph width metadata
- [x] Add unicode risk metadata
- [x] Add emoji risk metadata
- [x] Add recommended font stack metadata
- [x] Add combining character warning
- [x] Add monospace alignment notes
- [x] Add font fallback notes
- [x] Add preview font selector

## Testing

- [ ] Add Vitest
- [ ] Configure Vitest
- [ ] Test registry validation
- [ ] Test CSS generator
- [ ] Test React generator
- [ ] Test Tailwind generator
- [ ] Test frame parser
- [ ] Test slug lookup
- [ ] Add build check to local workflow
- [ ] Add lint check to local workflow

## Documentation

- [ ] Write project introduction
- [ ] Write registry concept docs
- [ ] Write copy-paste ownership docs
- [ ] Write rendering strategy docs
- [ ] Write accessibility docs
- [ ] Write reduced motion docs
- [ ] Write unicode rendering docs
- [ ] Write Tailwind integration docs
- [ ] Write future CLI docs
- [ ] Update roadmap after MVP scope changes

## Polish

- [ ] Refine homepage copy
- [ ] Refine homepage visual direction
- [ ] Add subtle text animation showcase
- [ ] Add responsive QA pass
- [ ] Add keyboard navigation QA pass
- [ ] Add focus state QA pass
- [ ] Add reduced motion QA pass
- [ ] Add light theme QA pass
- [ ] Add dark theme QA pass

## Future CLI

- [ ] Create CLI package plan
- [ ] Define Glyphe config schema
- [ ] Define `init` command behavior
- [ ] Define `add` command behavior
- [ ] Define dry run behavior
- [ ] Define file overwrite behavior
- [ ] Define registry fetch behavior
- [ ] Prototype local registry install

## Future Packages

- [ ] Plan `@glyphe/core`
- [ ] Plan `@glyphe/registry`
- [ ] Plan `@glyphe/generator`
- [ ] Plan `@glyphe/react`
- [ ] Plan `@glyphe/tailwind`
- [ ] Plan `@glyphe/cli`

## Deferred

- [ ] Add matrix rain primitive
- [ ] Add remote registry hosting
- [ ] Add custom registry support
- [ ] Add Tailwind plugin
- [ ] Add Vue adapter
- [ ] Add Svelte adapter
- [ ] Add Solid adapter
- [ ] Add saved animations
- [ ] Add user accounts
