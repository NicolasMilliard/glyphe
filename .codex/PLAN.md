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

- [ ] Create site header
- [ ] Create site navigation
- [ ] Create mobile navigation
- [ ] Create page container
- [ ] Create docs content wrapper
- [ ] Create footer
- [ ] Add active nav state
- [ ] Add responsive layout checks

## Routes

- [ ] Create gallery route
- [ ] Create animation detail route
- [ ] Create generator route
- [ ] Create docs route
- [ ] Create registry route
- [ ] Create examples route
- [ ] Add route metadata model
- [ ] Add breadcrumb helper

## Registry Core

- [ ] Add registry folder
- [ ] Add registry schema
- [ ] Add animation category enum
- [ ] Add rendering strategy enum
- [ ] Add accessibility metadata schema
- [ ] Add compatibility metadata schema
- [ ] Add registry index
- [ ] Add registry validation helper
- [ ] Add registry slug helper
- [ ] Add registry lookup helper
- [ ] Add duplicate slug check
- [ ] Add first spinner registry item

## Initial Registry Items

- [ ] Add braille spinner
- [ ] Add dots spinner
- [ ] Add line spinner
- [ ] Add clock spinner
- [ ] Add waveform loader
- [ ] Add bars loader
- [ ] Add ASCII progress
- [ ] Add block progress
- [ ] Add block cursor
- [ ] Add soft glitch text
- [ ] Add typewriter text
- [ ] Add scramble text

## Animation Rendering

- [ ] Create stacked spans renderer
- [ ] Create transform renderer
- [ ] Create scripted renderer placeholder
- [ ] Create preview renderer switch
- [ ] Add fixed preview dimensions
- [ ] Add monospace preview mode
- [ ] Add reduced motion preview mode
- [ ] Add animation speed override
- [ ] Add animation pause control

## CSS Generator

- [ ] Create CSS generator entry
- [ ] Generate class names
- [ ] Generate keyframe names
- [ ] Generate stacked span CSS
- [ ] Generate transform CSS
- [ ] Generate reduced motion CSS
- [ ] Generate CSS variables
- [ ] Escape generated identifiers
- [ ] Add CSS generator tests
- [ ] Add generated CSS snapshots

## React Generator

- [ ] Create React generator entry
- [ ] Generate component names
- [ ] Generate component props
- [ ] Generate stacked span markup
- [ ] Generate accessible label markup
- [ ] Generate decorative mode
- [ ] Generate status mode
- [ ] Generate reduced motion notes
- [ ] Add React generator tests
- [ ] Add generated React snapshots

## Tailwind Generator

- [ ] Create Tailwind generator entry
- [ ] Generate Tailwind-friendly CSS
- [ ] Generate `@theme` animation output
- [ ] Generate utility examples
- [ ] Generate className examples
- [ ] Add Tailwind generator tests
- [ ] Add generated Tailwind snapshots

## Gallery

- [ ] Create gallery page layout
- [ ] Create gallery filter controls
- [ ] Create category tabs
- [ ] Create animation card
- [ ] Add live preview to cards
- [ ] Add copy CSS action
- [ ] Add copy React action
- [ ] Add copy Tailwind action
- [ ] Add accessibility badge
- [ ] Add compatibility badge
- [ ] Add empty filter state

## Animation Detail

- [ ] Create detail page layout
- [ ] Create large animation preview
- [ ] Create preview controls
- [ ] Create code tabs
- [ ] Create CSS output panel
- [ ] Create React output panel
- [ ] Create Tailwind output panel
- [ ] Add accessibility notes section
- [ ] Add compatibility notes section
- [ ] Add customization notes section
- [ ] Add related animations section

## Generator Page

- [ ] Create generator page layout
- [ ] Create frame input textarea
- [ ] Parse whitespace-separated frames
- [ ] Parse newline-separated frames
- [ ] Add frame count display
- [ ] Add duration control
- [ ] Add timing control
- [ ] Add loop toggle
- [ ] Add rendering strategy control
- [ ] Add live generated preview
- [ ] Add output tabs
- [ ] Add validation messages
- [ ] Add glyph risk warnings
- [ ] Add reset example action

## Accessibility

- [ ] Define accessibility modes
- [ ] Add screen reader label helper
- [ ] Add decorative animation pattern
- [ ] Add status animation pattern
- [ ] Add text effect accessibility pattern
- [ ] Add reduced motion generator helper
- [ ] Add pause guidance
- [ ] Add flashing risk guidance
- [ ] Add accessibility docs page

## Unicode Compatibility

- [ ] Add glyph width metadata
- [ ] Add unicode risk metadata
- [ ] Add emoji risk metadata
- [ ] Add recommended font stack metadata
- [ ] Add combining character warning
- [ ] Add monospace alignment notes
- [ ] Add font fallback notes
- [ ] Add preview font selector

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
