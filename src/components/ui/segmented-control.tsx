import { cn } from '@/lib/cn';

export type SegmentedControlItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SegmentedControlProps = {
  items: SegmentedControlItem[];
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  className?: string;
};

export function SegmentedControl({
  items,
  value,
  onValueChange,
  label,
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        'rounded-glyphe-md border-border bg-surface inline-flex border p-1',
        className,
      )}
    >
      {items.map((item) => {
        const selected = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={item.disabled}
            onClick={() => onValueChange(item.value)}
            className={cn(
              'rounded-glyphe-sm px-3 py-1.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
              selected
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
