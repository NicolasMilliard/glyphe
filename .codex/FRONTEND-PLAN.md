# Glyphe Frontend Polish Plan

## Goal

Make Glyphe feel sharper, calmer, and more tactile without adding decorative
motion that fights the animation primitives themselves.

## Principles

- Prefer invisible polish over spectacle.
- Animate only when it clarifies state, gives feedback, or prevents jarring
  changes.
- Keep repeated interactions fast.
- Use CSS transitions for dynamic UI states.
- Animate `transform` and `opacity`, not layout properties.
- Respect `prefers-reduced-motion`.
- Let glyph previews remain the visual focus.

## Slice 1: Micro-Interaction Polish

- [x] Add shared easing tokens in `src/index.css`
- [x] Add subtle active press feedback to `Button`
- [x] Add subtle active press feedback to `IconButton`
- [x] Add subtle active press feedback to copy actions
- [x] Add subtle active press feedback to gallery/detail tiles
- [x] Gate hover transforms behind pointer/hover media queries
- [x] Replace broad transitions with explicit transition properties
- [x] Keep press feedback around `scale(0.97)`

## Slice 2: Tooltip And Small Feedback

- [x] Improve tooltip entrance with opacity and slight scale
- [x] Keep tooltip motion around 125-160ms
- [x] Make copy feedback more visible but still calm
- [x] Consider a small opacity/blur transition for `Copy` to `Copied`

## Slice 3: Navigation And State Controls

- [ ] Refine `SegmentedControl` active-state transition
- [ ] Refine `Tabs` active-state transition
- [ ] Keep keyboard-triggered state changes instant
- [ ] Make gallery filter controls feel consistent with detail controls
- [ ] Audit select, toggle, and checkbox focus/active states

## Slice 4: Gallery Experience

- [ ] Make gallery card hover states feel clickable but restrained
- [ ] Keep card previews compact and stable
- [ ] Avoid extra animation around already-animated glyph previews
- [ ] Review card spacing and badge hierarchy on mobile
- [ ] Check dark preview mode across all card categories

## Slice 5: Detail Page Experience

- [ ] Keep preview controls visually attached to the preview area
- [ ] Make generated code copy actions feel like primary actions
- [ ] Review implementation note sections for scanability
- [ ] Keep related/family preview tiles compact
- [ ] Audit detail page mobile stacking

## Slice 6: Examples Page

- [ ] Make examples feel like realistic product flows
- [ ] Reduce decorative framing when the interface example is enough
- [ ] Keep each example directly linked to its primitive
- [ ] Verify inline animation renderers match their context
- [ ] Avoid examples that feel like isolated ornaments

## Slice 7: Reduced Motion And Accessibility

- [ ] Audit UI transitions under `prefers-reduced-motion`
- [ ] Keep helpful opacity/color transitions where appropriate
- [ ] Remove transform-based motion for reduced-motion users
- [ ] Confirm preview reduced-motion controls match generated guidance
- [ ] Check focus-visible states on all interactive controls

## Review Checklist

Use this quick table when reviewing UI changes.

| Before                               | After                                 | Why                                          |
| ------------------------------------ | ------------------------------------- | -------------------------------------------- |
| Color-only button feedback           | Add subtle active scale               | Makes controls feel responsive               |
| `transition-all`                     | Specific transition properties        | Avoids accidental slow or costly transitions |
| Hover effects everywhere             | Hover effects only on pointer devices | Prevents awkward touch behavior              |
| Tooltip appears abruptly             | Opacity + slight scale                | Feels intentional without slowing the UI     |
| Long UI animation                    | 120-250ms transition                  | Keeps repeated interactions crisp            |
| Extra page animation around previews | Let glyph animations lead             | Avoids visual competition                    |
