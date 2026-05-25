import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'glyphe-ui-transition rounded-glyphe-md border-border bg-background text-foreground placeholder:text-muted-foreground min-h-28 w-full resize-y border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-4 focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  );
}
