import type { RegistryItem } from '@/registry';
import {
  generateCss,
  generateReducedMotionCss,
  getAnimationTimingFunction,
  getGeneratedCssNames,
} from './css';

type TailwindGeneratorOptions = {
  utilityName?: string;
  animationName?: string;
};

export function generateTailwindCss(
  item: RegistryItem,
  options: TailwindGeneratorOptions = {},
) {
  const names = getTailwindNames(item, options);

  return `${generateTailwindTheme(item, names)}

${generateTailwindUtilityCss(item, names)}

${generateReducedMotionCss(item, {
  rootClassName: names.utilityClassName,
  keyframeName: names.keyframeName,
})}`;
}

export function generateTailwindTheme(
  item: RegistryItem,
  names = getTailwindNames(item),
) {
  const frames = item.frames ?? [item.name];
  const steps = frames.length;
  const iteration = item.loop ? 'infinite' : '1';
  const fillMode = item.loop ? '' : ' forwards';

  return `@theme {
  --animate-${names.animationToken}: ${names.keyframeName} var(--glyphe-duration, ${item.duration}ms) ${getAnimationTimingFunction(item, steps)} ${iteration}${fillMode};

${generateTailwindKeyframes(item, names)
  .split('\n')
  .map((line) => (line.length > 0 ? `  ${line}` : line))
  .join('\n')}
}`;
}

export function generateTailwindUtilityCss(
  item: RegistryItem,
  names = getTailwindNames(item),
) {
  const css = generateCss(item, {
    className: names.utilityClassName,
    keyframeName: names.keyframeName,
  });

  return css
    .replace(
      generateReducedMotionCss(item, {
        rootClassName: names.utilityClassName,
        keyframeName: names.keyframeName,
      }),
      '',
    )
    .trim();
}

export function generateTailwindClassNameExample(
  item: RegistryItem,
  options: TailwindGeneratorOptions = {},
) {
  const names = getTailwindNames(item, options);

  return item.strategy === 'transform'
    ? `className="${names.utilityClassName} animate-${names.animationToken}"`
    : `className="${names.utilityClassName}"`;
}

export function generateTailwindUtilityExample(
  item: RegistryItem,
  options: TailwindGeneratorOptions = {},
) {
  const names = getTailwindNames(item, options);

  return `.${names.utilityClassName}`;
}

export function getTailwindNames(
  item: RegistryItem,
  options: TailwindGeneratorOptions = {},
) {
  const generated = getGeneratedCssNames(item, {
    className: options.utilityName,
    keyframeName: options.animationName,
  });

  return {
    utilityClassName: generated.rootClassName,
    keyframeName: generated.keyframeName,
    animationToken: generated.rootClassName.replace(/^glyphe-/, ''),
  };
}

function generateTailwindKeyframes(
  item: RegistryItem,
  names = getTailwindNames(item),
) {
  if (item.strategy === 'transform') {
    return `@keyframes ${names.keyframeName} {
  0%,
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }

  50% {
    transform: translate(0.08em, -0.04em);
    opacity: 0.82;
  }
}`;
  }

  const frames = item.frames ?? [item.name];
  const visiblePercent = 100 / frames.length;

  return `@keyframes ${names.keyframeName} {
  0% {
    opacity: 1;
  }

  ${visiblePercent}% {
    opacity: 1;
  }

  ${visiblePercent + 0.01}% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}`;
}
