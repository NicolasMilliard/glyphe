import type { RegistryItem } from '@/registry';

type CssGeneratorOptions = {
  className?: string;
  keyframeName?: string;
};

type GeneratedCssNames = {
  rootClassName: string;
  keyframeName: string;
};

export function generateCss(
  item: RegistryItem,
  options: CssGeneratorOptions = {},
) {
  const names = getGeneratedCssNames(item, options);

  switch (item.strategy) {
    case 'stacked-spans':
      return generateStackedSpanCss(item, names);
    case 'css-var-swap':
      return generateCssVariableSwapCss(item, names);
    case 'pseudo-content':
      return generatePseudoContentCss(item, names);
    case 'transform':
      return generateTransformCss(item, names);
    case 'scripted':
      return generateScriptedPlaceholderCss(item, names);
  }
}

export function getGeneratedCssNames(
  item: RegistryItem,
  options: CssGeneratorOptions = {},
): GeneratedCssNames {
  const identifier = escapeCssIdentifier(item.slug);

  return {
    rootClassName: options.className ?? `glyphe-${identifier}`,
    keyframeName: options.keyframeName ?? `glyphe-${identifier}-frames`,
  };
}

export function generateStackedSpanCss(
  item: RegistryItem,
  names = getGeneratedCssNames(item),
) {
  const frames = item.frames ?? [item.name];
  const animation = getAnimationDeclaration(item, names, frames.length);
  const width = `${Math.max(...frames.map((frame) => frame.length), 1)}ch`;
  const delayStep = item.duration / frames.length;
  const frameRules = frames
    .map(
      (
        _frame,
        index,
      ) => `.${names.rootClassName} > span:nth-child(${index + 1}) {
  animation-delay: -${Math.round(item.duration - delayStep * index)}ms;
}`,
    )
    .join('\n\n');

  return `${generateCssVariables(item, names)}

.${names.rootClassName} {
  display: inline-grid;
  place-items: center;
  width: var(--glyphe-width, ${width});
  min-height: 1em;
  font-family: var(--glyphe-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
  line-height: 1;
}

.${names.rootClassName} > span {
  grid-area: 1 / 1;
  opacity: 0;
  animation: ${animation};
}

${frameRules}

@keyframes ${names.keyframeName} {
  0% {
    opacity: 1;
  }

  ${100 / frames.length}% {
    opacity: 1;
  }

  ${100 / frames.length + 0.01}% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

${generateReducedMotionCss(item, names)}`;
}

export function generateCssVariableSwapCss(
  item: RegistryItem,
  names = getGeneratedCssNames(item),
) {
  const frames = item.frames ?? [item.name];
  const frameKeyframes = frames
    .map((frame, index) => {
      const percent = Math.round((index / frames.length) * 10000) / 100;

      return `  ${percent}% {
    --glyphe-frame: "${escapeCssString(frame)}";
  }`;
    })
    .join('\n\n');

  return `${generateCssVariables(item, names)}

.${names.rootClassName} {
  display: inline-block;
  min-width: var(--glyphe-width, ${Math.max(...frames.map((frame) => frame.length), 1)}ch);
  font-family: var(--glyphe-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
  line-height: 1;
  animation: ${getAnimationDeclaration(item, names, frames.length)};
}

.${names.rootClassName}::before {
  content: var(--glyphe-frame, "${escapeCssString(frames[0] ?? '')}");
}

@keyframes ${names.keyframeName} {
${frameKeyframes}
}

${generateReducedMotionCss(item, names)}`;
}

export function generatePseudoContentCss(
  item: RegistryItem,
  names = getGeneratedCssNames(item),
) {
  const frames = item.frames ?? [item.name];
  const frameKeyframes = frames
    .map((frame, index) => {
      const percent = Math.round((index / frames.length) * 10000) / 100;

      return `  ${percent}% {
    content: "${escapeCssString(frame)}";
  }`;
    })
    .join('\n\n');

  return `${generateCssVariables(item, names)}

.${names.rootClassName} {
  display: inline-block;
  min-width: var(--glyphe-width, ${Math.max(...frames.map((frame) => frame.length), 1)}ch);
  font-family: var(--glyphe-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
  line-height: 1;
}

.${names.rootClassName}::before {
  content: "${escapeCssString(frames[0] ?? '')}";
  animation: ${getAnimationDeclaration(item, names, frames.length)};
}

@keyframes ${names.keyframeName} {
${frameKeyframes}
}

${generateReducedMotionCss(item, names)}`;
}

export function generateTransformCss(
  item: RegistryItem,
  names = getGeneratedCssNames(item),
) {
  const frames = item.frames ?? [item.name];

  return `${generateCssVariables(item, names)}

.${names.rootClassName} {
  display: inline-block;
  animation: ${getAnimationDeclaration(item, names, frames.length)};
  will-change: transform, opacity;
}

@keyframes ${names.keyframeName} {
  0%,
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }

  50% {
    transform: translate(0.08em, -0.04em);
    opacity: 0.82;
  }
}

${generateReducedMotionCss(item, names)}`;
}

export function generateScriptedPlaceholderCss(
  item: RegistryItem,
  names = getGeneratedCssNames(item),
) {
  return `${generateCssVariables(item, names)}

.${names.rootClassName} {
  display: inline-block;
}`;
}

export function generateCssVariables(
  item: RegistryItem,
  names = getGeneratedCssNames(item),
) {
  return `.${names.rootClassName} {
  --glyphe-duration: ${item.duration}ms;
}`;
}

export function generateReducedMotionCss(
  item: RegistryItem,
  names = getGeneratedCssNames(item),
) {
  if (item.accessibility.reducedMotion === 'slowed') {
    return `@media (prefers-reduced-motion: reduce) {
  .${names.rootClassName} {
    --glyphe-duration: ${item.duration * 2}ms;
  }
}`;
  }

  return `@media (prefers-reduced-motion: reduce) {
  .${names.rootClassName},
  .${names.rootClassName}::before,
  .${names.rootClassName} > span {
    animation: none;
  }

  .${names.rootClassName} > span {
    opacity: 0;
  }

  .${names.rootClassName} > span:first-child {
    opacity: 1;
  }
}`;
}

export function getAnimationTimingFunction(
  item: RegistryItem,
  frameCount: number,
) {
  switch (item.timing) {
    case 'steps':
      return `steps(${frameCount}, end)`;
    case 'linear':
      return 'linear';
    case 'ease':
      return 'ease';
    case 'custom':
      return 'var(--glyphe-timing-function, steps(' + frameCount + ', end))';
  }
}

export function getAnimationDeclaration(
  item: RegistryItem,
  names = getGeneratedCssNames(item),
  frameCount = item.frames?.length ?? 1,
) {
  const iteration = item.loop ? 'infinite' : '1';
  const fillMode = item.loop ? '' : ' forwards';

  return `${names.keyframeName} var(--glyphe-duration, ${item.duration}ms) ${getAnimationTimingFunction(item, frameCount)} ${iteration}${fillMode}`;
}

export function escapeCssIdentifier(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeCssString(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
