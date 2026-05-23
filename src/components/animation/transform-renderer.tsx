import { cn } from '@/lib/cn';
import type { RegistryItem } from '@/registry';

type TransformRendererProps = {
  item: RegistryItem;
  speed?: number;
  paused?: boolean;
  reducedMotion?: boolean;
  monospace?: boolean;
  className?: string;
};

export function TransformRenderer({
  item,
  speed = item.duration,
  paused = false,
  reducedMotion = false,
  monospace = item.compatibility.requiresMonospace,
  className,
}: TransformRendererProps) {
  const animation =
    paused || reducedMotion
      ? 'none'
      : `glyphe-shift ${speed}ms steps(2, end) infinite`;

  return (
    <span
      className={cn(
        'text-foreground inline-block text-3xl font-semibold',
        monospace && 'font-mono',
        className,
      )}
      style={{ animation }}
    >
      {item.name}
    </span>
  );
}
