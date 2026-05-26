# Package Boundary Planning

## Goal

Prepare Glyphe for future packages without extracting too early. The app should
prove the product loop first, then packages should follow stable boundaries.

## Preferred Future Package Map

- [x] `glyphe`
  - Public CLI package.
  - Enables `bunx glyphe ...` and `npx glyphe ...`.

- [x] `@glyphe/core`
  - Shared types, schema, slug helpers, accessibility helpers, and compatibility
    helpers.

- [x] `@glyphe/registry`
  - Canonical registry items and registry lookup utilities.

- [x] `@glyphe/generator`
  - CSS, React, and Tailwind code generation.

- [x] `@glyphe/react`
  - Optional runtime React preview/rendering primitives.
  - Should stay small and not be required for copy/paste ownership.

- [x] `@glyphe/tailwind`
  - Optional Tailwind integration helpers, if the generator alone is not enough.

## Extraction Principles

- Do not extract packages until APIs are stable in the app.
- Keep generated user code independent from Glyphe packages where possible.
- Prefer schema-driven contracts over ad hoc object shapes.
- Keep registry data portable and serializable.
- Avoid making the website depend on unpublished package complexity too early.
- Package boundaries should reduce maintenance, not add ceremony.

## Proposed Monorepo Structure

- [x] `apps/www`
- [x] `packages/core`
- [x] `packages/registry`
- [x] `packages/generator`
- [x] `packages/react`
- [x] `packages/tailwind`
- [x] `packages/glyphe`

## Boundary Decisions To Make

- [x] Move the current app to `apps/www` when the repo becomes a monorepo
- [x] Extract core package boundaries before the first public package release
- [x] Keep registry source entries in TypeScript and generate JSON for remote hosting later
- [x] Keep registry schema in `@glyphe/core`
- [x] Make generators depend on core types and accept registry-shaped input
- [x] Keep React renderers website-local for now
- [x] Defer Tailwind helpers until generated Tailwind output proves insufficient
- [x] Ship the CLI against the bundled local registry first, then add remote registry support

## Package Responsibilities

### `@glyphe/core`

- [x] Registry schema types
- [x] Slug helpers
- [x] Accessibility guidance helpers
- [x] Unicode compatibility helpers
- [x] Shared constants
- [x] No React dependency
- [x] No website dependency

### `@glyphe/registry`

- [x] Registry items
- [x] Registry lookup helpers
- [x] Category/family/tag helpers
- [x] Registry validation
- [x] Optional generated JSON output
- [x] Depends on `@glyphe/core`

### `@glyphe/generator`

- [x] CSS generator
- [x] React generator
- [x] Tailwind generator
- [x] Naming helpers
- [x] Escaping helpers
- [x] Snapshot tests
- [x] Depends on `@glyphe/core`

### `@glyphe/react`

- [x] Runtime renderers only if useful
- [x] Preview components only if they are package-worthy
- [x] No dependency on website UI components
- [x] Should not be required for copied generated React components

### `@glyphe/tailwind`

- [x] Optional plugin or preset helpers
- [x] Tailwind v4-first design
- [x] Avoid duplicating generator output unless there is a clear DX win

### `glyphe` CLI

- [x] `glyphe init`
- [x] `glyphe add <slug>`
- [x] `glyphe registry list`
- [x] `glyphe generate --frames "..."`
- [x] Detect project framework
- [x] Write user-owned files
- [x] Avoid hidden runtime dependency by default

## Current Source Ownership

This is the source map to use before any file moves happen.

### Core Candidates

- `src/registry/schema.ts`
- `src/registry/slug.ts`
- `src/lib/accessibility.ts`
- `src/lib/unicode-compatibility.ts`

These modules are already close to package-ready. The main cleanup before extraction is import direction: core modules should not import from `@/registry`; they should own the shared types directly.

### Registry Candidates

- `src/registry/items/*`
- `src/registry/index.ts`
- `src/registry/presets.ts`
- `src/registry/validation.ts`

Registry data should remain TypeScript as the authoring format. A generated JSON artifact can be added later for remote registry hosting and CLI fetches.

### Generator Candidates

- `src/generator/css.ts`
- `src/generator/react.ts`
- `src/generator/tailwind.ts`
- `src/generator/frames.ts`
- `src/generator/*.test.ts`
- `src/generator/__snapshots__/*`

Generators should accept `RegistryItem`-shaped input, but should not import official registry data at runtime. Tests can keep using official registry items as fixtures.

### CLI Candidate

- `cli/index.ts`
- `cli/local-install.ts`
- `cli/local-install.test.ts`

The current CLI prototype is allowed to import from `src/` until extraction starts. When packages exist, it should depend on `@glyphe/core`, `@glyphe/registry`, and `@glyphe/generator`.

### Website-Local Code

- `src/routes/*`
- `src/components/site/*`
- `src/components/ui/*`
- `src/components/gallery/*`
- `src/components/animation/*`
- `src/lib/cn.ts`
- `src/lib/routes.ts`
- `src/lib/site.ts`
- `src/lib/use-document-title.ts`
- `src/lib/use-prefers-reduced-motion.ts`

React preview components are website product code for now. They can inform a future `@glyphe/react`, but they should not become a public runtime package until a user workflow requires it.

## Extraction Order

1. Add workspace structure and move the website to `apps/www`.
2. Extract `@glyphe/core`.
3. Extract `@glyphe/registry`.
4. Extract `@glyphe/generator`.
5. Move the CLI prototype into `packages/glyphe`.
6. Decide whether `@glyphe/react` deserves a v1 package.
7. Decide whether `@glyphe/tailwind` deserves a v1 package.

Do not extract `@glyphe/react` or `@glyphe/tailwind` as part of the first package move. The copy/paste model is stronger if these remain optional.

## First Public Release Scope

The first public package release should include:

- `glyphe` CLI
- `@glyphe/core`
- `@glyphe/registry`
- `@glyphe/generator`

The first public package release should not include:

- remote registries
- user accounts
- saved animations
- framework adapters beyond generated React output
- a Tailwind plugin unless generated Tailwind output becomes inadequate

The website can be deployed before package extraction. Public npm packages should wait until the boundaries above are real package directories with their own build outputs and tests.

## Release Workflow To Decide

The remaining open decision is release tooling.

Recommended candidates:

- Changesets for versioning and changelog management
- Bun workspaces for local development
- GitHub Actions for `bun install`, `bun run check`, package builds, and publish dry-runs

This should be decided before the first package extraction commit, because it affects package layout, build scripts, and publish metadata.

## Pre-Extraction Checklist

- [x] Registry quality pass is complete
- [x] Documentation pass is complete enough to describe package behavior
- [x] Generator export polish is complete
- [x] CLI prototype can install local registry items
- [x] Tests cover registry, generators, and slug lookup
- [x] Public package names are reserved or confirmed available
- [ ] Release workflow is chosen

## Current Recommendation

Package extraction should be planned next, but not executed until the release workflow and first public scope are agreed. Start with `@glyphe/core`, `@glyphe/registry`, and `@glyphe/generator`; keep `@glyphe/react` and `@glyphe/tailwind` optional until a clear DX win appears.

## Definition Of Done

- [ ] Package boundaries are documented
- [ ] Extraction order is agreed
- [ ] App code has clear seams for extraction
- [ ] No package is extracted only because it feels tidy
- [ ] Future `bunx glyphe add spinner/braille` remains compatible with the plan
