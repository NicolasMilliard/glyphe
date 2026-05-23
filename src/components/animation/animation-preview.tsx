import { cn } from '@/lib/cn';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';
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
  fontFamily?: string;
  loopPreview?: boolean;
  className?: string;
  rendererClassName?: string;
};

export function AnimationPreview({
  item,
  speed,
  paused,
  reducedMotion,
  monospace,
  fontFamily,
  loopPreview,
  className,
  rendererClassName,
}: AnimationPreviewProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const effectiveReducedMotion = reducedMotion ?? prefersReducedMotion;

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
        reducedMotion: effectiveReducedMotion,
        monospace,
        fontFamily,
        loopPreview,
        rendererClassName,
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
  fontFamily,
  loopPreview,
  rendererClassName,
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
          fontFamily={fontFamily}
          className={rendererClassName}
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
          fontFamily={fontFamily}
          loopPreview={loopPreview}
          className={rendererClassName}
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
          fontFamily={fontFamily}
          className={rendererClassName}
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
          fontFamily={fontFamily}
          loopPreview={loopPreview}
          className={rendererClassName}
        />
      );
  }
}
