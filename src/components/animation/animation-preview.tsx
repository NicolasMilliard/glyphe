import { cn } from '@/lib/cn';
import type { RegistryItem } from '@/registry';
import { ScriptedRendererPlaceholder } from './scripted-renderer-placeholder';
import { StackedSpansRenderer } from './stacked-spans-renderer';
import { TransformRenderer } from './transform-renderer';

export type AnimationPreviewProps = {
  item: RegistryItem;
  speed?: number;
  paused?: boolean;
  reducedMotion?: boolean;
  monospace?: boolean;
  className?: string;
};

export function AnimationPreview({
  item,
  speed,
  paused,
  reducedMotion,
  monospace,
  className,
}: AnimationPreviewProps) {
  return (
    <div
      className={cn(
        'rounded-glyphe-lg border-border bg-surface grid min-h-40 place-items-center border p-6',
        className,
      )}
    >
      {renderPreview({
        item,
        speed,
        paused,
        reducedMotion,
        monospace,
      })}
    </div>
  );
}

function renderPreview({
  item,
  speed,
  paused,
  reducedMotion,
  monospace,
}: Omit<AnimationPreviewProps, 'className'>) {
  switch (item.strategy) {
    case 'stacked-spans':
    case 'css-var-swap':
    case 'pseudo-content':
      return (
        <StackedSpansRenderer
          item={item}
          speed={speed}
          paused={paused}
          reducedMotion={reducedMotion}
          monospace={monospace}
        />
      );
    case 'transform':
      return (
        <TransformRenderer
          item={item}
          speed={speed}
          paused={paused}
          reducedMotion={reducedMotion}
          monospace={monospace}
        />
      );
    case 'scripted':
      return <ScriptedRendererPlaceholder item={item} monospace={monospace} />;
  }
}
