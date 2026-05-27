import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/cn';

const textDefaultElements = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  paragraph: 'p',
  lead: 'p',
  small: 'small',
  label: 'label',
  caption: 'span',
  code: 'code',
} as const;

const textRhythmClasses = {
  display: {
    compact: 'leading-none',
    default: 'leading-[1.04]',
    comfortable: 'leading-tight',
  },
  h1: {
    compact: 'leading-none',
    default: 'leading-[1.08]',
    comfortable: 'leading-tight',
  },
  h2: {
    compact: 'leading-none',
    default: 'leading-[1.12]',
    comfortable: 'leading-tight',
  },
  h3: {
    compact: 'leading-tight',
    default: 'leading-[1.2]',
    comfortable: 'leading-8',
  },
  h4: {
    compact: 'leading-tight',
    default: 'leading-7',
    comfortable: 'leading-8',
  },
  h5: {
    compact: 'leading-tight',
    default: 'leading-7',
    comfortable: 'leading-8',
  },
  h6: {
    compact: 'leading-tight',
    default: 'leading-6',
    comfortable: 'leading-7',
  },
  paragraph: {
    compact: 'leading-snug',
    default: 'leading-7',
    comfortable: 'leading-8',
  },
  lead: {
    compact: 'leading-snug',
    default: 'leading-8',
    comfortable: 'leading-9',
  },
  small: {
    compact: 'leading-snug',
    default: 'leading-6',
    comfortable: 'leading-7',
  },
  label: {
    compact: 'leading-none',
    default: 'leading-none',
    comfortable: 'leading-5',
  },
  caption: {
    compact: 'leading-none',
    default: 'leading-5',
    comfortable: 'leading-6',
  },
  code: {
    compact: 'leading-snug',
    default: 'leading-6',
    comfortable: 'leading-7',
  },
} as const;

const textVariants = cva('min-w-0 text-start', {
  variants: {
    intent: {
      display: 'text-5xl font-semibold tracking-tight sm:text-7xl',
      h1: 'text-4xl font-semibold tracking-tight sm:text-6xl',
      h2: 'text-3xl font-semibold tracking-tight sm:text-4xl',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
      paragraph: 'text-base',
      lead: 'text-lg',
      small: 'text-sm',
      label: 'text-sm font-medium',
      caption: 'text-xs',
      code: 'rounded bg-muted px-1.5 py-0.5 font-mono text-sm',
    },
    tone: {
      foreground: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-muted-foreground/80',
      primary: 'text-primary',
      destructive: 'text-destructive',
      inherit: 'text-inherit',
    },
    family: {
      inherit: 'font-[inherit]',
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
    },
    weight: {
      inherit: 'font-[inherit]',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tracking: {
      inherit: '',
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
      justify: 'text-justify',
    },
    wrap: {
      pretty: 'text-pretty',
      balance: 'text-balance',
      normal: 'text-wrap',
      nowrap: 'whitespace-nowrap',
      break: 'break-words',
      truncate: 'truncate',
    },
    transform: {
      none: '',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    measure: {
      none: '',
      narrow: 'max-w-[45ch]',
      readable: 'max-w-[65ch]',
      wide: 'max-w-[75ch]',
    },
  },
  defaultVariants: {
    intent: 'paragraph',
    tone: 'foreground',
    family: 'inherit',
    tracking: 'inherit',
    align: 'start',
    wrap: 'pretty',
    transform: 'none',
    measure: 'none',
  },
});

type TextElement = React.ElementType;

type TextIntent = keyof typeof textDefaultElements;
type TextRhythm = keyof (typeof textRhythmClasses)[TextIntent];

type TextVariantProps = Omit<VariantProps<typeof textVariants>, 'intent'>;

type TextOwnProps = TextVariantProps & {
  className?: string;
  intent?: TextIntent;
  rhythm?: TextRhythm;
};

type PolymorphicTextProps<TElement extends TextElement> = Omit<
  React.ComponentPropsWithoutRef<TElement>,
  keyof TextOwnProps | 'as' | 'color'
> &
  TextOwnProps & {
    as?: TElement;
  };

type LabelIntentTextProps = Omit<
  PolymorphicTextProps<'label'>,
  'as' | 'intent'
> & {
  intent: 'label';
  as?: 'label';
};

type TextProps<TElement extends TextElement = 'p'> =
  | LabelIntentTextProps
  | PolymorphicTextProps<TElement>;

function Text<TElement extends TextElement = 'p'>({
  as,
  className,
  intent = 'paragraph',
  rhythm = 'default',
  tone = 'foreground',
  family = 'inherit',
  weight,
  tracking = 'inherit',
  align = 'start',
  wrap = 'pretty',
  transform = 'none',
  measure = 'none',
  ...props
}: TextProps<TElement>) {
  const Comp = (as ?? textDefaultElements[intent]) as React.ElementType;

  return (
    <Comp
      data-slot="text"
      data-intent={intent}
      data-rhythm={rhythm}
      className={cn(
        textVariants({
          intent,
          tone,
          family,
          weight,
          tracking,
          align,
          wrap,
          transform,
          measure,
        }),
        textRhythmClasses[intent][rhythm],
        className,
      )}
      {...props}
    />
  );
}

export { Text };
export type { TextIntent, TextProps, TextRhythm };
