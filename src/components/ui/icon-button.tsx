import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type IconButtonVariant = 'secondary' | 'ghost' | 'danger';
type IconButtonSize = 'sm' | 'md' | 'lg';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

const iconButtonVariants: Record<IconButtonVariant, string> = {
  secondary: 'border-border bg-surface text-foreground hover:bg-surface-strong',
  ghost:
    'border-transparent text-muted-foreground hover:bg-surface hover:text-foreground',
  danger: 'border-danger/40 bg-danger/10 text-danger hover:bg-danger/15',
};

const iconButtonSizes: Record<IconButtonSize, string> = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-11',
};

export function IconButton({
  className,
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'rounded-glyphe-md inline-grid place-items-center border transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4',
        iconButtonVariants[variant],
        iconButtonSizes[size],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
