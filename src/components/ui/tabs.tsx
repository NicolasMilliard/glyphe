import type { KeyboardEvent, ReactNode } from 'react';
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

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }

    const enabledItems = items.filter((item) => !item.disabled);
    if (enabledItems.length === 0 || !selectedItem) {
      return;
    }

    const currentIndex = enabledItems.findIndex(
      (item) => item.value === selectedItem.value,
    );
    const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = getKeyboardIndex({
      currentIndex: fallbackIndex,
      key: event.key,
      total: enabledItems.length,
    });
    const nextItem = enabledItems[nextIndex];

    if (!nextItem) {
      return;
    }

    event.preventDefault();
    const enabledButtons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        'button:not(:disabled)',
      ),
    );
    enabledButtons[nextIndex]?.focus();
    onValueChange(nextItem.value);
  }

  return (
    <div className={cn('w-full min-w-0', className)}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
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
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => onValueChange(item.value)}
              className={cn(
                'glyphe-pressable rounded-glyphe-sm shrink-0 px-3 py-1.5 text-sm font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50',
                selected
                  ? 'border-border bg-background text-foreground ring-border shadow-sm ring-1'
                  : 'text-muted-foreground hover:bg-background/70 hover:text-foreground',
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

function getKeyboardIndex({
  currentIndex,
  key,
  total,
}: {
  currentIndex: number;
  key: string;
  total: number;
}) {
  if (key === 'Home') {
    return 0;
  }

  if (key === 'End') {
    return total - 1;
  }

  if (key === 'ArrowLeft') {
    return (currentIndex - 1 + total) % total;
  }

  return (currentIndex + 1) % total;
}
