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

- [x] Revisit whether preset selection should stay
- [x] If presets stay, reduce to one strong preset per category
- [ ] Add clearer empty state for custom frames
- [x] Improve handling of frames that contain spaces
- [x] Make frame parsing rules visible but compact
- [x] Add validation for invisible or whitespace-only frames
- [x] Add validation for very wide frames
- [x] Add validation for potentially flashy frame sets
- [x] Clarify loop behavior in UI and generated output
- [x] Clarify timing behavior in UI and generated output

## Export Tabs

- [x] Improve CSS output heading and description
- [x] Improve React output heading and description
- [x] Improve Tailwind output heading and description
- [x] Add a short "best for" note to each output
- [x] Make copy actions visually primary enough
- [ ] Consider "Copy all" for multi-file React/Tailwind output

## Rendering Strategy Polish

- [x] Ensure stacked spans output matches stacked spans preview
- [x] Ensure CSS variable swap output matches preview intent
- [x] Ensure pseudo-content output is visibly different where possible
- [x] Ensure transform output uses the actual frames when expected
- [x] Ensure scripted preview is clearly labeled as preview-only when needed
- [x] Add strategy-specific accessibility notes
- [ ] Add strategy-specific browser compatibility notes

## Generated CSS Quality

- [ ] Audit generated class names
- [ ] Audit generated keyframe names
- [ ] Audit CSS variable names
- [ ] Audit width behavior for single-cell and multi-character frames
- [ ] Audit reduced-motion media query output
- [x] Audit escaping for quotes, slashes, backslashes, and Unicode
- [ ] Audit generated comments or remove unnecessary comments

## Generated React Quality

- [x] Confirm components are copy/paste friendly
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

## Slice 2: Escaping And Copy Safety

- [x] Escape generated CSS strings for quotes, backslashes, and line breaks
- [x] Emit React frame text as JSX string expressions
- [x] Preserve ASCII frames with internal spaces in generated React
- [x] Add tests for CSS content escaping
- [x] Add tests for JSX-reserved frame characters

## Slice 3: Frame Input Validation

- [x] Expose space mode versus line mode in the generator UI
- [x] Move generator frame validation into tested generator code
- [x] Warn when ASCII frames with internal spaces are entered on one line
- [x] Warn for empty, too-wide, duplicate, and very fast frame sets
- [x] Keep line-based parsing preserving internal spaces

## Slice 4: Export Tab Clarity

- [x] Give CSS, React, and Tailwind outputs distinct panel titles
- [x] Add a compact "best for" note per output format
- [x] Surface duration, timing, and loop behavior beside generated code
- [x] Make copy actions visually primary inside generator output panels

## Preset Strategy

- [x] Keep one braille spinner preset
- [x] Keep one ASCII spinner preset
- [x] Keep one loader preset
- [x] Keep one progress preset
- [x] Keep one text effect preset
- [x] Consider hiding dense braille variants from presets
- [x] Keep full registry available in gallery instead of generator dropdown

## Slice 5: Curated Presets

- [x] Keep generator presets as five teaching examples
- [x] Remove cursor and extra text-effect presets from the generator dropdown
- [x] Keep broader registry discovery in gallery and CLI planning lists
- [x] Add a test that locks the generator preset set

## Slice 6: Strategy Export Notes

- [x] Add strategy notes to CSS, React, and Tailwind output panels
- [x] Clarify that scripted CSS and Tailwind exports are styling hooks
- [x] Explain generated-content accessibility risk for CSS variable and pseudo-content strategies
- [x] Keep transform and stacked-span guidance concise

## Definition Of Done

- [ ] Preview and exports match for each strategy
- [ ] Timing, loop, and duration changes affect generated code
- [ ] Space-containing frames are handled safely
- [ ] Presets feel curated
- [ ] Generated code feels small enough to own
- [ ] Generator tests cover edge cases and strategy differences
