import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import type { RegistryItem } from '@/registry';

type TransformRendererProps = {
  item: RegistryItem;
  speed?: number;
  paused?: boolean;
  reducedMotion?: boolean;
  monospace?: boolean;
  fontFamily?: string;
  className?: string;
};

export function TransformRenderer({
  item,
  speed = item.duration,
  paused = false,
  reducedMotion = false,
  monospace = item.compatibility.requiresMonospace,
  fontFamily,
  className,
}: TransformRendererProps) {
  const frames = useMemo(() => item.frames ?? [item.name], [item]);
  const [activeFrame, setActiveFrame] = useState(0);
  const animation =
    paused || reducedMotion
      ? 'none'
      : `glyphe-shift ${speed}ms steps(2, end) ${item.loop ? 'infinite' : '1 forwards'}`;
  const maxFrameLength = Math.max(...frames.map((frame) => frame.length), 1);
  const safeFrame = Math.min(activeFrame, frames.length - 1);
  const visibleFrame = reducedMotion
    ? frames[frames.length - 1]
    : frames[safeFrame];

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

  return (
    <span
      className={cn(
        'text-foreground inline-block text-3xl font-semibold',
        monospace && 'font-mono',
        className,
      )}
      style={{ animation, fontFamily, minWidth: `${maxFrameLength}ch` }}
    >
      {visibleFrame}
    </span>
  );
}
