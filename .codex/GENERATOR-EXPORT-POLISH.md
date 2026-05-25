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
- [x] Add clearer empty state for custom frames
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
- [x] Consider "Copy all" for multi-file React/Tailwind output

## Rendering Strategy Polish

- [x] Ensure stacked spans output matches stacked spans preview
- [x] Ensure CSS variable swap output matches preview intent
- [x] Ensure pseudo-content output is visibly different where possible
- [x] Ensure transform output uses the actual frames when expected
- [x] Ensure scripted preview is clearly labeled as preview-only when needed
- [x] Add strategy-specific accessibility notes
- [x] Add strategy-specific browser compatibility notes

## Generated CSS Quality

- [x] Audit generated class names
- [x] Audit generated keyframe names
- [x] Audit CSS variable names
- [x] Audit width behavior for single-cell and multi-character frames
- [x] Audit reduced-motion media query output
- [x] Audit escaping for quotes, slashes, backslashes, and Unicode
- [x] Audit generated comments or remove unnecessary comments

## Generated React Quality

- [x] Confirm components are copy/paste friendly
- [x] Confirm generated props are minimal and useful
- [x] Confirm accessible labels are included where needed
- [x] Confirm decorative items can be hidden from assistive tech
- [x] Confirm reduced-motion notes align with CSS output
- [x] Decide whether generated React should include CSS or import CSS

## Generated Tailwind Quality

- [x] Confirm Tailwind v4 output shape
- [x] Confirm utility naming
- [x] Confirm theme token naming
- [x] Confirm example class usage
- [x] Confirm compatibility with local user-owned CSS files
- [x] Decide how future `@glyphe/tailwind` package should expose helpers

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

## Slice 7: Strategy Compatibility Notes

- [x] Add browser/rendering caveats to generator output panels
- [x] Call out unicode glyph-width testing for stacked spans
- [x] Call out generated-content and CSS-variable support expectations
- [x] Call out scripted runtime and reduced-motion fallback needs

## Slice 8: Generated CSS Quality

- [x] Sanitize generated class and keyframe name overrides
- [x] Keep CSS variable names stable and scoped to `--glyphe-*`
- [x] Estimate frame box width by code point instead of UTF-16 length
- [x] Keep reduced-motion output covered by generator tests
- [x] Confirm generated CSS does not add unnecessary comments

## Slice 9: Generated React Quality

- [x] Sanitize generated class name overrides through the CSS naming helper
- [x] Keep React props limited to `label`, `decorative`, and `className`
- [x] Render stable status labels only when `decorative` is false
- [x] Hide recommended moving frames from assistive tech
- [x] Keep React output separate from CSS and point users to the generated CSS media query

## Slice 10: Generated Tailwind Quality

- [x] Show Tailwind class usage beside the generated output without adding copied comments
- [x] Sanitize Tailwind utility and animation token overrides through generator names
- [x] Confirm generated Tailwind CSS is pasteable into a local stylesheet
- [x] Keep future `@glyphe/tailwind` package boundary as thin helpers over generator functions

## Slice 11: Generator Completion

- [x] Add an empty state for blank custom frame input
- [x] Defer "Copy all" until React/Tailwind exports become multi-file outputs
- [x] Re-check generator definition of done against tests and output behavior

## Definition Of Done

- [x] Preview and exports match for each strategy
- [x] Timing, loop, and duration changes affect generated code
- [x] Space-containing frames are handled safely
- [x] Presets feel curated
- [x] Generated code feels small enough to own
- [x] Generator tests cover edge cases and strategy differences
