import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/cn';

const textSkeletonDefaultElements = {
  display: 'div',
  h1: 'div',
  h2: 'div',
  h3: 'div',
  h4: 'div',
  h5: 'div',
  h6: 'div',
  paragraph: 'div',
  lead: 'div',
  small: 'div',
  label: 'span',
  caption: 'span',
  code: 'span',
} as const;

const textSkeletonVariants = cva('min-w-0 text-start', {
  variants: {
    intent: {
      display: 'text-5xl leading-[1.04] sm:text-7xl',
      h1: 'text-4xl leading-[1.08] sm:text-6xl',
      h2: 'text-3xl leading-[1.12] sm:text-4xl',
      h3: 'text-2xl leading-[1.2]',
      h4: 'text-xl leading-7',
      h5: 'text-lg leading-7',
      h6: 'text-base leading-6',
      paragraph: 'text-base leading-7',
      lead: 'text-lg leading-8',
      small: 'text-sm leading-6',
      label: 'text-sm leading-none',
      caption: 'text-xs leading-5',
      code: 'font-mono text-sm leading-6',
    },
    measure: {
      none: '',
      narrow: 'max-w-[45ch]',
      readable: 'max-w-[65ch]',
      wide: 'max-w-[75ch]',
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
    },
  },
  defaultVariants: {
    intent: 'paragraph',
    measure: 'none',
    align: 'start',
  },
});

type TextSkeletonElement = React.ElementType;
type TextSkeletonIntent = keyof typeof textSkeletonDefaultElements;

type TextSkeletonProps<TElement extends TextSkeletonElement = 'div'> = Omit<
  React.ComponentProps<TElement>,
  'as' | 'children' | 'color'
> &
  VariantProps<typeof textSkeletonVariants> & {
    as?: TElement;
    intent?: TextSkeletonIntent;
    lineClassName?: string;
    lines?: number;
  };

function TextSkeleton<TElement extends TextSkeletonElement = 'div'>({
  as,
  'aria-label': ariaLabel,
  className,
  intent = 'paragraph',
  lineClassName,
  lines = 1,
  measure = 'none',
  align = 'start',
  role,
  ...props
}: TextSkeletonProps<TElement>) {
  const Comp = (as ?? textSkeletonDefaultElements[intent]) as React.ElementType;
  const lineCount = Math.max(1, Math.floor(lines));
  const isDecorative = ariaLabel === undefined;

  return (
    <Comp
      aria-hidden={isDecorative ? true : undefined}
      aria-label={ariaLabel}
      data-slot="text-skeleton"
      data-intent={intent}
      role={role ?? (isDecorative ? undefined : 'status')}
      className={cn(
        textSkeletonVariants({ intent, measure, align, className }),
      )}
      {...props}
    >
      <span className="block space-y-[0.45em]" aria-hidden="true">
        {Array.from({ length: lineCount }, (_, index) => (
          <span
            key={index}
            className={cn(
              'glyphe-text-skeleton bg-muted block h-[1em] animate-[glyphe-text-skeleton_1400ms_ease-in-out_infinite] rounded-[0.28em]',
              getSkeletonLineWidth(index, lineCount),
              lineClassName,
            )}
          />
        ))}
      </span>
    </Comp>
  );
}

function getSkeletonLineWidth(index: number, lineCount: number) {
  if (lineCount === 1) {
    return 'w-full';
  }

  if (index === lineCount - 1) {
    return 'w-3/4';
  }

  return index % 3 === 1 ? 'w-[92%]' : 'w-full';
}

export { TextSkeleton };
export type { TextSkeletonIntent, TextSkeletonProps };
