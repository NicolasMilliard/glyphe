import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'rounded-glyphe-md border-border bg-background text-foreground placeholder:text-muted-foreground min-h-28 w-full resize-y border px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  );
}
