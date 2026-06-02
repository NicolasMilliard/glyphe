import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/cn';

const typewriterTextVariants = cva(
  'glyphe-typewriter max-w-full overflow-hidden align-baseline',
  {
    variants: {
      cursor: {
        true: 'after:inline-block after:content-[""]',
        false: '',
      },
      tone: {
        inherit: '',
        foreground: 'text-foreground',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
      },
    },
    defaultVariants: {
      cursor: true,
      tone: 'inherit',
    },
  },
);

type TypewriterTextElement = React.ElementType;
type TypewriterTextStyle = React.CSSProperties & {
  '--glyphe-typewriter-delay'?: string;
  '--glyphe-typewriter-duration'?: string;
  '--glyphe-typewriter-steps'?: number;
};

type TypewriterTextProps<TElement extends TypewriterTextElement = 'span'> =
  Omit<React.ComponentProps<TElement>, 'as' | 'color'> &
    VariantProps<typeof typewriterTextVariants> & {
      as?: TElement;
      asChild?: boolean;
      delay?: string;
      duration?: string;
      steps?: number;
    };

function TypewriterText<TElement extends TypewriterTextElement = 'span'>({
  as,
  asChild = false,
  className,
  cursor = true,
  delay = '0ms',
  duration = '1200ms',
  steps = 24,
  style,
  tone = 'inherit',
  ...props
}: TypewriterTextProps<TElement>) {
  const Comp = asChild ? Slot.Root : ((as ?? 'span') as React.ElementType);
  const typewriterStyle: TypewriterTextStyle = {
    '--glyphe-typewriter-delay': delay,
    '--glyphe-typewriter-duration': duration,
    '--glyphe-typewriter-steps': steps,
    ...style,
  };

  return (
    <Comp
      data-slot="typewriter-text"
      data-cursor={cursor ? '' : undefined}
      className={cn(
        typewriterTextVariants({ cursor, tone }),
        !asChild && 'inline-block whitespace-nowrap',
        className,
      )}
      style={typewriterStyle}
      {...props}
    />
  );
}

export { TypewriterText };
export type { TypewriterTextProps };
