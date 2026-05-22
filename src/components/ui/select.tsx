import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'rounded-glyphe-md border-border bg-background text-foreground h-10 w-full border px-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
