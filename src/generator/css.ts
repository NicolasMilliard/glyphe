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
    case 'css-var-swap':
    case 'pseudo-content':
      return generateStackedSpanCss(item, names);
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
  const duration = `var(--glyphe-duration, ${item.duration}ms)`;
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
  animation: ${names.keyframeName} ${duration} steps(${frames.length}, end) infinite;
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

export function generateTransformCss(
  item: RegistryItem,
  names = getGeneratedCssNames(item),
) {
  const duration = `var(--glyphe-duration, ${item.duration}ms)`;

  return `${generateCssVariables(item, names)}

.${names.rootClassName} {
  display: inline-block;
  animation: ${names.keyframeName} ${duration} steps(2, end) infinite;
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

export function escapeCssIdentifier(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
