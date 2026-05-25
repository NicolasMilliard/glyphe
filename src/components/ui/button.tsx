import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'border-accent bg-accent text-accent-foreground hover:bg-accent/90',
  secondary: 'border-border bg-surface text-foreground hover:bg-surface-strong',
  ghost:
    'border-transparent text-muted-foreground hover:bg-surface hover:text-foreground',
  danger: 'border-danger bg-danger text-danger-foreground hover:bg-danger/90',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
};

export function Button({
  className,
  variant = 'secondary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'glyphe-pressable rounded-glyphe-md inline-flex items-center justify-center gap-2 border font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}
