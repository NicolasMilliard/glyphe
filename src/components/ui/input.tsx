import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'rounded-glyphe-md border-border bg-background text-foreground placeholder:text-muted-foreground h-10 w-full border px-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  );
}
