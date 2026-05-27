import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/cn';

const textLinkVariants = cva(
  'rounded-[2px] underline-offset-[0.18em] decoration-[0.075em] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  {
    variants: {
      tone: {
        inherit: 'text-inherit decoration-current/35 hover:decoration-current',
        foreground:
          'text-foreground decoration-foreground/35 hover:decoration-foreground',
        muted:
          'text-muted-foreground decoration-muted-foreground/35 hover:text-foreground hover:decoration-foreground',
        primary: 'text-primary decoration-primary/35 hover:decoration-primary',
        destructive:
          'text-destructive decoration-destructive/35 hover:decoration-destructive',
      },
      underline: {
        always: 'underline',
        hover: 'no-underline hover:underline',
        subtle: 'underline decoration-dotted hover:decoration-solid',
        none: 'no-underline',
      },
      weight: {
        inherit: '[font-weight:inherit]',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      tone: 'inherit',
      underline: 'always',
      weight: 'inherit',
    },
  },
);

type TextLinkProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'color'> &
  VariantProps<typeof textLinkVariants> & {
    external?: boolean;
  };

function TextLink({
  className,
  external = false,
  rel,
  target,
  tone = 'inherit',
  underline = 'always',
  weight = 'inherit',
  ...props
}: TextLinkProps) {
  const externalTarget = external ? (target ?? '_blank') : target;
  const externalRel =
    external && externalTarget === '_blank'
      ? mergeRel(rel, 'noopener noreferrer')
      : rel;

  return (
    <a
      data-slot="text-link"
      data-external={external ? '' : undefined}
      className={cn(textLinkVariants({ tone, underline, weight, className }))}
      rel={externalRel}
      target={externalTarget}
      {...props}
    />
  );
}

function mergeRel(rel: string | undefined, defaults: string) {
  return Array.from(
    new Set([rel, defaults].filter(Boolean).join(' ').split(' ')),
  )
    .filter(Boolean)
    .join(' ');
}

export { TextLink };
export type { TextLinkProps };
