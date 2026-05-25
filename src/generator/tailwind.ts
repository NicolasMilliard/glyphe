import type { RegistryItem } from '@/registry';
import {
  generateCss,
  generateReducedMotionCss,
  getAnimationDeclaration,
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
}`;
}

export function generateTailwindUtilityCss(
  item: RegistryItem,
  names = getTailwindNames(item),
) {
  const animationDeclaration = getAnimationDeclaration(
    item,
    {
      rootClassName: names.utilityClassName,
      keyframeName: names.keyframeName,
    },
    item.frames?.length ?? 1,
  );
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
    .replaceAll(
      `animation: ${animationDeclaration};`,
      `animation: var(--animate-${names.animationToken});`,
    )
    .trim();
}

export function generateTailwindClassNameExample(
  item: RegistryItem,
  options: TailwindGeneratorOptions = {},
) {
  const names = getTailwindNames(item, options);

  return `className="${names.utilityClassName}"`;
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
