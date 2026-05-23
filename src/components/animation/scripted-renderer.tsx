import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import type { RegistryItem } from '@/registry';

type ScriptedRendererProps = {
  item: RegistryItem;
  speed?: number;
  paused?: boolean;
  reducedMotion?: boolean;
  monospace?: boolean;
  loopPreview?: boolean;
  className?: string;
};

export function ScriptedRenderer({
  item,
  speed = item.duration,
  paused = false,
  reducedMotion = false,
  monospace = item.compatibility.requiresMonospace,
  loopPreview = false,
  className,
}: ScriptedRendererProps) {
  const frames = useMemo(() => getScriptedFrames(item), [item]);
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    if (paused || reducedMotion || frames.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveFrame((frame) => {
        const nextFrame = frame + 1;

        if (nextFrame >= frames.length) {
          return item.loop || loopPreview ? 0 : frame;
        }

        return nextFrame;
      });
    }, speed / frames.length);

    return () => window.clearInterval(interval);
  }, [frames.length, item.loop, loopPreview, paused, reducedMotion, speed]);

  const safeFrame = Math.min(activeFrame, frames.length - 1);
  const visibleFrame =
    reducedMotion || paused ? frames[frames.length - 1] : frames[safeFrame];
  const maxFrameLength = Math.max(...frames.map((frame) => frame.length), 1);

  return (
    <span
      className={cn(
        'text-foreground inline-flex min-h-8 items-center text-2xl font-medium',
        monospace && 'font-mono',
        className,
      )}
      style={{ minWidth: `${maxFrameLength}ch` }}
    >
      {visibleFrame}
    </span>
  );
}

function getScriptedFrames(item: RegistryItem) {
  if (item.frames?.length) {
    return item.frames;
  }

  if (item.slug === 'text/typewriter') {
    const text = 'Glyphe';

    return Array.from({ length: text.length + 1 }, (_value, index) =>
      text.slice(0, index),
    );
  }

  return [item.name];
}
