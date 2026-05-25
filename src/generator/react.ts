import type { RegistryItem } from '@/registry';
import {
  getReducedMotionGuidance,
  getScreenReaderLabel,
} from '@/lib/accessibility';
import { getGeneratedCssNames } from './css';

type ReactGeneratorOptions = {
  componentName?: string;
  className?: string;
};

export function generateReactComponent(
  item: RegistryItem,
  options: ReactGeneratorOptions = {},
) {
  const componentName = options.componentName ?? getComponentName(item);
  const rootClassName = getGeneratedCssNames(item, {
    className: options.className,
  }).rootClassName;
  const frames = item.frames ?? [item.name];
  const label = getScreenReaderLabel(item);
  const props = generateComponentProps();
  const markup = generateComponentMarkup(item, {
    componentName,
    rootClassName,
    frames,
    label,
  });

  return `type ${componentName}Props = ${props};

export function ${componentName}({
  label = '${escapeStringLiteral(label)}',
  decorative = ${item.accessibility.decorative},
  className,
}: ${componentName}Props) {
${markup}
}

${generateReducedMotionNote(item)}`;
}

export function getComponentName(item: RegistryItem) {
  return `${toPascalCase(item.slug)}Animation`;
}

export function generateComponentProps() {
  return `{
  label?: string;
  decorative?: boolean;
  className?: string;
}`;
}

export function generateStackedSpanMarkup(
  item: RegistryItem,
  options: {
    rootClassName: string;
    frames: string[];
  },
) {
  const ariaHidden = item.accessibility.ariaHiddenRecommended
    ? '{true}'
    : '{decorative ? true : undefined}';
  const spans = options.frames
    .map((frame) => `        <span>{${formatJsxString(frame)}}</span>`)
    .join('\n');

  return `      <span
        className={[ '${options.rootClassName}', className ].filter(Boolean).join(' ')}
        aria-hidden=${ariaHidden}
      >
${spans}
      </span>`;
}

export function generateSingleElementMarkup(
  item: RegistryItem,
  options: {
    rootClassName: string;
    frame?: string;
  },
) {
  const ariaHidden = item.accessibility.ariaHiddenRecommended
    ? '{true}'
    : '{decorative ? true : undefined}';
  const content = options.frame
    ? `\n        {${formatJsxString(options.frame)}}\n      `
    : '';

  return `      <span
        className={[ '${options.rootClassName}', className ].filter(Boolean).join(' ')}
        aria-hidden=${ariaHidden}
      >${content}</span>`;
}

export function generateAccessibleLabelMarkup(item: RegistryItem) {
  if (needsStatusRole(item)) {
    return `{decorative ? null : <span className="sr-only" role="status">{label}</span>}`;
  }

  return `{decorative ? null : <span className="sr-only">{label}</span>}`;
}

export function generateReducedMotionNote(item: RegistryItem) {
  return `// Reduced motion: ${getReducedMotionGuidance(item)} Keep the generated CSS media query with this component.`;
}

function generateComponentMarkup(
  item: RegistryItem,
  options: {
    componentName: string;
    rootClassName: string;
    frames: string[];
    label: string;
  },
) {
  const animatedMarkup = generateAnimatedMarkup(item, options);
  const labelMarkup = generateAccessibleLabelMarkup(item);

  if (item.accessibility.decorative) {
    return `  return (
    <>
      ${labelMarkup}
${animatedMarkup}
    </>
  );`;
  }

  return `  return (
    <>
      ${labelMarkup}
${animatedMarkup}
    </>
  );`;
}

function generateAnimatedMarkup(
  item: RegistryItem,
  options: {
    rootClassName: string;
    frames: string[];
  },
) {
  switch (item.strategy) {
    case 'stacked-spans':
      return generateStackedSpanMarkup(item, options);
    case 'css-var-swap':
    case 'pseudo-content':
      return generateSingleElementMarkup(item, options);
    case 'transform':
      return generateSingleElementMarkup(item, {
        ...options,
        frame: options.frames[0],
      });
    case 'scripted':
      return generateSingleElementMarkup(item, options);
  }
}

function toPascalCase(value: string) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function escapeStringLiteral(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

export function formatJsxString(value: string) {
  return `'${escapeStringLiteral(value)}'`;
}

function needsStatusRole(item: RegistryItem) {
  return ['loader', 'progress', 'spinner'].includes(item.category);
}
