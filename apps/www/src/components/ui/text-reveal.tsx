import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/cn';

const textRevealVariants = cva('glyphe-text-reveal', {
  variants: {
    effect: {
      fade: 'glyphe-text-reveal-fade',
      blur: 'glyphe-text-reveal-blur',
      slide: 'glyphe-text-reveal-slide',
      mask: 'glyphe-text-reveal-mask',
    },
  },
  defaultVariants: {
    effect: 'mask',
  },
});

type TextRevealElement = React.ElementType;
type TextRevealStyle = React.CSSProperties & {
  '--glyphe-text-reveal-delay'?: string;
  '--glyphe-text-reveal-duration'?: string;
};

type TextRevealProps<TElement extends TextRevealElement = 'span'> = Omit<
  React.ComponentProps<TElement>,
  'as'
> &
  VariantProps<typeof textRevealVariants> & {
    as?: TElement;
    asChild?: boolean;
    delay?: string;
    duration?: string;
  };

function TextReveal<TElement extends TextRevealElement = 'span'>({
  as,
  asChild = false,
  className,
  delay = '0ms',
  duration = '720ms',
  effect = 'mask',
  style,
  ...props
}: TextRevealProps<TElement>) {
  const Comp = asChild ? Slot.Root : ((as ?? 'span') as React.ElementType);
  const revealStyle: TextRevealStyle = {
    '--glyphe-text-reveal-delay': delay,
    '--glyphe-text-reveal-duration': duration,
    ...style,
  };

  return (
    <Comp
      data-slot="text-reveal"
      className={cn(textRevealVariants({ effect, className }))}
      style={revealStyle}
      {...props}
    />
  );
}

export { TextReveal };
export type { TextRevealProps };
