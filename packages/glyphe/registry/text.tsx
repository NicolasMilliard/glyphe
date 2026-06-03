import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

const variants = {
  display:
    'text-[3rem]/[3.6rem] md:text-[3.5rem]/[4.2rem] font-semibold tracking-tight',
  'heading-xl': 'text-[2rem]/[2.4rem] font-semibold tracking-tight',
  'heading-lg': 'text-[1.75rem]/[2.1rem] font-semibold tracking-tight',
  'heading-md': 'text-[1.5rem]/[1.8rem] font-semibold',
  'heading-sm': 'text-[1.25rem]/[1.75rem] font-semibold',
  'body-lg': 'text-[1.125rem]/[1.6875rem] font-normal',
  'body-md': 'text-[1rem]/[1.5rem] font-normal',
  'body-sm': 'text-[0.875rem]/[1.3125rem] font-normal',
  label: 'text-[1rem]/[1.5rem] font-medium',
  caption: 'text-[0.75rem]/[1.125rem] font-normal',
  mono: 'text-[1rem]/[1.5rem] font-mono',
} as const;

type Variant = keyof typeof variants;

type TextTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'strong'
  | 'em'
  | 'small'
  | 'mark'
  | 'code'
  | 'pre'
  | 'kbd'
  | 'samp'
  | 'label'
  | 'legend'
  | 'abbr'
  | 'blockquote'
  | 'cite'
  | 'q'
  | 's'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup'
  | 'time';

type TextOwnProps<T extends TextTag = 'span'> = {
  as?: T;
  variant?: Variant;
  ref?: ComponentPropsWithRef<T>['ref'];
  children?: ReactNode;
};

type TextProps<T extends TextTag = 'span'> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

function Text<T extends TextTag = 'span'>({
  as,
  variant = 'body-md',
  ref,
  children,
  className,
  ...props
}: TextProps<T>) {
  const Component = (as ?? 'span') as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Text };
export type { TextProps };
