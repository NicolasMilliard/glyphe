import type { RegistryItem } from '@/registry';
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
  const rootClassName =
    options.className ?? getGeneratedCssNames(item).rootClassName;
  const frames = item.frames ?? [item.name];
  const label = item.accessibility.defaultLabel ?? item.name;
  const props = generateComponentProps(item);
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

export function generateComponentProps(item: RegistryItem) {
  if (item.accessibility.decorative) {
    return `{
  label?: string;
  decorative?: boolean;
  className?: string;
}`;
  }

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
    ? '{decorative}'
    : '{decorative ? true : undefined}';
  const spans = options.frames
    .map((frame) => `        <span>${escapeJsxText(frame)}</span>`)
    .join('\n');

  return `      <span
        className={[ '${options.rootClassName}', className ].filter(Boolean).join(' ')}
        aria-hidden=${ariaHidden}
      >
${spans}
      </span>`;
}

export function generateAccessibleLabelMarkup(item: RegistryItem) {
  if (item.accessibility.decorative) {
    return `{decorative ? <span className="sr-only">{label}</span> : null}`;
  }

  return `{decorative ? null : <span className="sr-only">{label}</span>}`;
}

export function generateReducedMotionNote(item: RegistryItem) {
  return `// Reduced motion: ${item.accessibility.reducedMotion}. Keep the generated CSS media query with this component.`;
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
${animatedMarkup}
      ${labelMarkup}
    </>
  );`;
  }

  return `  return (
    <span role="status" aria-label={label}>
${animatedMarkup}
      ${labelMarkup}
    </span>
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
    case 'css-var-swap':
    case 'pseudo-content':
      return generateStackedSpanMarkup(item, options);
    case 'transform':
    case 'scripted':
      return `      <span
        className={[ '${options.rootClassName}', className ].filter(Boolean).join(' ')}
        aria-hidden={decorative}
      >
        {label}
      </span>`;
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
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function escapeJsxText(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}
