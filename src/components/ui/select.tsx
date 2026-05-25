import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <span className="relative inline-block w-full">
      <select
        className={cn(
          'glyphe-ui-transition rounded-glyphe-md border-border bg-background text-foreground h-10 w-full appearance-none border py-0 pr-10 pl-3 text-sm disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring focus-visible:outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  );
}
