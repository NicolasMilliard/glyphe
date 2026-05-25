import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type TooltipProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function Tooltip({ label, children, className }: TooltipProps) {
  const tooltipId = useId();

  return (
    <span
      tabIndex={0}
      aria-describedby={tooltipId}
      className={cn(
        'group focus-visible:ring-ring/20 rounded-glyphe-sm relative inline-flex focus-visible:ring-4 focus-visible:outline-none',
        className,
      )}
    >
      {children}
      <span
        id={tooltipId}
        role="tooltip"
        className="rounded-glyphe-sm border-border bg-surface-strong text-foreground pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-56 origin-bottom -translate-x-1/2 scale-95 border px-2 py-1 text-xs opacity-0 shadow-sm transition-[opacity,transform] duration-150 ease-[var(--ease-out)] group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100 motion-reduce:scale-100 motion-reduce:transition-opacity"
      >
        {label}
      </span>
    </span>
  );
}
