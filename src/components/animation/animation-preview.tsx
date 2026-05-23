import { cn } from '@/lib/cn';
import type { RegistryItem } from '@/registry';
import { ScriptedRenderer } from './scripted-renderer';
import { StackedSpansRenderer } from './stacked-spans-renderer';
import { TransformRenderer } from './transform-renderer';

export type AnimationPreviewProps = {
  item: RegistryItem;
  speed?: number;
  paused?: boolean;
  reducedMotion?: boolean;
  monospace?: boolean;
  loopPreview?: boolean;
  className?: string;
};

export function AnimationPreview({
  item,
  speed,
  paused,
  reducedMotion,
  monospace,
  loopPreview,
  className,
}: AnimationPreviewProps) {
  return (
    <div
      className={cn(
        'rounded-glyphe-lg border-border bg-surface grid min-h-40 min-w-0 place-items-center overflow-hidden border p-6',
        className,
      )}
    >
      {renderPreview({
        item,
        speed,
        paused,
        reducedMotion,
        monospace,
        loopPreview,
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
  loopPreview,
}: Omit<AnimationPreviewProps, 'className'>) {
  switch (item.strategy) {
    case 'stacked-spans':
      return (
        <StackedSpansRenderer
          item={item}
          speed={speed}
          paused={paused}
          reducedMotion={reducedMotion}
          monospace={monospace}
        />
      );
    case 'css-var-swap':
    case 'pseudo-content':
      return (
        <ScriptedRenderer
          item={item}
          speed={speed}
          paused={paused}
          reducedMotion={reducedMotion}
          monospace={monospace}
          loopPreview={loopPreview}
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
      return (
        <ScriptedRenderer
          item={item}
          speed={speed}
          paused={paused}
          reducedMotion={reducedMotion}
          monospace={monospace}
          loopPreview={loopPreview}
        />
      );
  }
}
