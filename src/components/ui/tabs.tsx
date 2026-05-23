import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type TabItem = {
  label: string;
  value: string;
  content: ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
};

export function Tabs({
  items,
  value,
  onValueChange,
  label = 'Tabs',
  className,
}: TabsProps) {
  const selectedItem = items.find((item) => item.value === value) ?? items[0];

  return (
    <div className={cn('w-full min-w-0', className)}>
      <div
        role="tablist"
        aria-label={label}
        className="rounded-glyphe-md border-border bg-surface inline-flex max-w-full overflow-x-auto border p-1"
      >
        {items.map((item) => {
          const selected = item.value === selectedItem?.value;

          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${item.value}-panel`}
              id={`${item.value}-tab`}
              disabled={item.disabled}
              onClick={() => onValueChange(item.value)}
              className={cn(
                'rounded-glyphe-sm shrink-0 px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50',
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

      {selectedItem ? (
        <div
          role="tabpanel"
          id={`${selectedItem.value}-panel`}
          aria-labelledby={`${selectedItem.value}-tab`}
          className="mt-4 min-w-0"
        >
          {selectedItem.content}
        </div>
      ) : null}
    </div>
  );
}
