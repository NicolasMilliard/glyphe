# Generator Export Polish

## Goal

Make the generator feel trustworthy: users should understand what they are
creating, why each output differs, and how to copy usable code confidently.

## Principles

- Preview and exported code must match.
- Strategy differences must be visible and explainable.
- Generated code should be small, readable, and ownable.
- Copy feedback should feel clear because copying is the main action.
- Presets should teach, not overwhelm.

## Generator UX

- [ ] Revisit whether preset selection should stay
- [ ] If presets stay, reduce to one strong preset per category
- [ ] Add clearer empty state for custom frames
- [ ] Improve handling of frames that contain spaces
- [ ] Make frame parsing rules visible but compact
- [ ] Add validation for invisible or whitespace-only frames
- [ ] Add validation for very wide frames
- [ ] Add validation for potentially flashy frame sets
- [ ] Clarify loop behavior in UI and generated output
- [ ] Clarify timing behavior in UI and generated output

## Export Tabs

- [ ] Improve CSS output heading and description
- [ ] Improve React output heading and description
- [ ] Improve Tailwind output heading and description
- [ ] Add a short "best for" note to each output
- [ ] Make copy actions visually primary enough
- [ ] Consider "Copy all" for multi-file React/Tailwind output

## Rendering Strategy Polish

- [ ] Ensure stacked spans output matches stacked spans preview
- [ ] Ensure CSS variable swap output matches preview intent
- [ ] Ensure pseudo-content output is visibly different where possible
- [ ] Ensure transform output uses the actual frames when expected
- [ ] Ensure scripted preview is clearly labeled as preview-only when needed
- [ ] Add strategy-specific accessibility notes
- [ ] Add strategy-specific browser compatibility notes

## Generated CSS Quality

- [ ] Audit generated class names
- [ ] Audit generated keyframe names
- [ ] Audit CSS variable names
- [ ] Audit width behavior for single-cell and multi-character frames
- [ ] Audit reduced-motion media query output
- [ ] Audit escaping for quotes, slashes, backslashes, and Unicode
- [ ] Audit generated comments or remove unnecessary comments

## Generated React Quality

- [ ] Confirm components are copy/paste friendly
- [ ] Confirm generated props are minimal and useful
- [ ] Confirm accessible labels are included where needed
- [ ] Confirm decorative items can be hidden from assistive tech
- [ ] Confirm reduced-motion notes align with CSS output
- [ ] Decide whether generated React should include CSS or import CSS

## Generated Tailwind Quality

- [x] Confirm Tailwind v4 output shape
- [x] Confirm utility naming
- [x] Confirm theme token naming
- [ ] Confirm example class usage
- [ ] Confirm compatibility with local user-owned CSS files
- [ ] Decide how future `@glyphe/tailwind` package should expose helpers

## Slice 1: Tailwind Export Shape

- [x] Keep `@theme` focused on the animation token
- [x] Make generated utilities consume `var(--animate-*)`
- [x] Preserve strategy-specific keyframes from the CSS generator
- [x] Remove extra generated `animate-*` class from examples
- [x] Add tests for CSS variable swap and pseudo-content Tailwind output

## Preset Strategy

- [ ] Keep one braille spinner preset
- [ ] Keep one ASCII spinner preset
- [ ] Keep one loader preset
- [ ] Keep one progress preset
- [ ] Keep one text effect preset
- [ ] Consider hiding dense braille variants from presets
- [ ] Keep full registry available in gallery instead of generator dropdown

## Definition Of Done

- [ ] Preview and exports match for each strategy
- [ ] Timing, loop, and duration changes affect generated code
- [ ] Space-containing frames are handled safely
- [ ] Presets feel curated
- [ ] Generated code feels small enough to own
- [ ] Generator tests cover edge cases and strategy differences
