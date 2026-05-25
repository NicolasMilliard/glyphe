# Package Boundary Planning

## Goal

Prepare Glyphe for future packages without extracting too early. The app should
prove the product loop first, then packages should follow stable boundaries.

## Preferred Future Package Map

- [ ] `glyphe`
  - Public CLI package.
  - Enables `bunx glyphe ...` and `npx glyphe ...`.

- [ ] `@glyphe/core`
  - Shared types, schema, slug helpers, accessibility helpers, and compatibility
    helpers.

- [ ] `@glyphe/registry`
  - Canonical registry items and registry lookup utilities.

- [ ] `@glyphe/generator`
  - CSS, React, and Tailwind code generation.

- [ ] `@glyphe/react`
  - Optional runtime React preview/rendering primitives.
  - Should stay small and not be required for copy/paste ownership.

- [ ] `@glyphe/tailwind`
  - Optional Tailwind integration helpers, if the generator alone is not enough.

## Extraction Principles

- Do not extract packages until APIs are stable in the app.
- Keep generated user code independent from Glyphe packages where possible.
- Prefer schema-driven contracts over ad hoc object shapes.
- Keep registry data portable and serializable.
- Avoid making the website depend on unpublished package complexity too early.
- Package boundaries should reduce maintenance, not add ceremony.

## Proposed Monorepo Structure

- [ ] `apps/www`
- [ ] `packages/core`
- [ ] `packages/registry`
- [ ] `packages/generator`
- [ ] `packages/react`
- [ ] `packages/tailwind`
- [ ] `packages/cli`

## Boundary Decisions To Make

- [ ] Decide if the current app moves to `apps/www`
- [ ] Decide if package extraction happens before or after first public release
- [ ] Decide if registry entries should be TypeScript, JSON, or generated JSON
- [ ] Decide if registry schema lives in `core` or `registry`
- [ ] Decide if generators depend on registry types only or registry data too
- [ ] Decide if React renderers are product code, package code, or both
- [ ] Decide if Tailwind helpers are necessary for v1
- [ ] Decide if CLI installs from local registry files or remote registry JSON

## Package Responsibilities

### `@glyphe/core`

- [ ] Registry schema types
- [ ] Slug helpers
- [ ] Accessibility guidance helpers
- [ ] Unicode compatibility helpers
- [ ] Shared constants
- [ ] No React dependency
- [ ] No website dependency

### `@glyphe/registry`

- [ ] Registry items
- [ ] Registry lookup helpers
- [ ] Category/family/tag helpers
- [ ] Registry validation
- [ ] Optional generated JSON output
- [ ] Depends on `@glyphe/core`

### `@glyphe/generator`

- [ ] CSS generator
- [ ] React generator
- [ ] Tailwind generator
- [ ] Naming helpers
- [ ] Escaping helpers
- [ ] Snapshot tests
- [ ] Depends on `@glyphe/core`

### `@glyphe/react`

- [ ] Runtime renderers only if useful
- [ ] Preview components only if they are package-worthy
- [ ] No dependency on website UI components
- [ ] Should not be required for copied generated React components

### `@glyphe/tailwind`

- [ ] Optional plugin or preset helpers
- [ ] Tailwind v4-first design
- [ ] Avoid duplicating generator output unless there is a clear DX win

### `glyphe` CLI

- [ ] `glyphe init`
- [ ] `glyphe add <slug>`
- [ ] `glyphe registry list`
- [ ] `glyphe generate --frames "..."`
- [ ] Detect project framework
- [ ] Write user-owned files
- [ ] Avoid hidden runtime dependency by default

## Pre-Extraction Checklist

- [ ] Registry quality pass is complete
- [ ] Documentation pass is complete enough to describe package behavior
- [ ] Generator export polish is complete
- [ ] CLI prototype can install local registry items
- [ ] Tests cover registry, generators, and slug lookup
- [ ] Public package names are reserved or confirmed available
- [ ] Release workflow is chosen

## Definition Of Done

- [ ] Package boundaries are documented
- [ ] Extraction order is agreed
- [ ] App code has clear seams for extraction
- [ ] No package is extracted only because it feels tidy
- [ ] Future `bunx glyphe add spinner/braille` remains compatible with the plan
