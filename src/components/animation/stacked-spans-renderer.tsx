import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import type { RegistryItem } from '@/registry';

type StackedSpansRendererProps = {
  item: RegistryItem;
  speed?: number;
  paused?: boolean;
  reducedMotion?: boolean;
  monospace?: boolean;
  className?: string;
};

export function StackedSpansRenderer({
  item,
  speed = item.duration,
  paused = false,
  reducedMotion = false,
  monospace = item.compatibility.requiresMonospace,
  className,
}: StackedSpansRendererProps) {
  const frames = useMemo(() => item.frames ?? [item.name], [item]);
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    if (paused || reducedMotion || frames.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveFrame((frame) => {
        const nextFrame = frame + 1;

        if (nextFrame >= frames.length) {
          return item.loop ? 0 : frame;
        }

        return nextFrame;
      });
    }, speed / frames.length);

    return () => window.clearInterval(interval);
  }, [frames.length, item.loop, paused, reducedMotion, speed]);

  const maxFrameLength = Math.max(...frames.map((frame) => frame.length), 1);
  const visibleFrame =
    paused || reducedMotion ? 0 : activeFrame % frames.length;

  return (
    <span
      aria-hidden={item.accessibility.ariaHiddenRecommended}
      className={cn(
        'text-foreground inline-grid min-h-8 place-items-center text-3xl leading-none',
        monospace && 'font-mono',
        className,
      )}
      style={{ minWidth: `${maxFrameLength}ch` }}
    >
      {frames.map((frame, index) => (
        <span
          key={`${frame}-${index}`}
          className={cn(
            'col-start-1 row-start-1 transition-opacity duration-75',
            index === visibleFrame ? 'opacity-100' : 'opacity-0',
          )}
        >
          {frame}
        </span>
      ))}
    </span>
  );
}
