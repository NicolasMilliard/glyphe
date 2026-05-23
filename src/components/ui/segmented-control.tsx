import { cn } from '@/lib/cn';
import type { KeyboardEvent } from 'react';

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
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }

    const enabledItems = items.filter((item) => !item.disabled);
    if (enabledItems.length === 0) {
      return;
    }
    const currentIndex = enabledItems.findIndex((item) => item.value === value);
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
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={cn(
        'rounded-glyphe-md border-border bg-surface inline-flex max-w-full overflow-x-auto border p-1',
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
            tabIndex={selected ? 0 : -1}
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
