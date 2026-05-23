import { cn } from '@/lib/cn';
import type { RegistryItem } from '@/registry';

type ScriptedRendererPlaceholderProps = {
  item: RegistryItem;
  monospace?: boolean;
  className?: string;
};

export function ScriptedRendererPlaceholder({
  item,
  monospace = item.compatibility.requiresMonospace,
  className,
}: ScriptedRendererPlaceholderProps) {
  return (
    <span
      className={cn(
        'text-muted-foreground inline-flex min-h-8 items-center text-xl',
        monospace && 'font-mono',
        className,
      )}
    >
      {item.name}
    </span>
  );
}
