import {
  IconButton,
  Input,
  SegmentedControl,
  Select,
  Tooltip,
} from '@/components/ui';
import { cn } from '@/lib/cn';
import {
  getPreviewFontFamily,
  getUnicodeCompatibilityGuidance,
  previewFontStackOptions,
} from '@/lib/unicode-compatibility';
import { getReducedMotionGuidance } from '@/lib/accessibility';
import type { RecommendedFontStack, RegistryItem } from '@/registry';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';
import { useState } from 'react';
import { AnimationPreview } from './animation-preview';

type AnimationPreviewWorkbenchProps = {
  item: RegistryItem;
};

export function AnimationPreviewWorkbench({
  item,
}: AnimationPreviewWorkbenchProps) {
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [motionOverride, setMotionOverride] = useState<
    'motion' | 'reduced' | null
  >(null);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [fontStack, setFontStack] = useState<RecommendedFontStack>(
    getUnicodeCompatibilityGuidance(item).recommendedFontStack,
  );
  const [speed, setSpeed] = useState(item.duration);
  const reducedMotion =
    motionOverride === null
      ? prefersReducedMotion
      : motionOverride === 'reduced';
  const reducedMotionGuidance = getReducedMotionGuidance(item);
  const fontFamily = getPreviewFontFamily(fontStack);
  const monospace = fontStack === 'monospace';

  return (
    <div className="grid gap-4">
      <div
        className={cn(
          'rounded-glyphe-lg relative overflow-hidden',
          previewTheme === 'dark' ? 'theme-dark' : 'theme-light',
        )}
      >
        <p className="text-muted-foreground absolute top-4 left-4 z-10 hidden font-mono text-xs uppercase sm:block">
          Preview
        </p>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <ThemeToggle
            value={previewTheme}
            onChange={() =>
              setPreviewTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
            }
          />
          <IconButton
            label={paused ? 'Resume animation' : 'Pause animation'}
            icon={paused ? <PlayIcon /> : <PauseIcon />}
            variant="secondary"
            className="bg-background/90 backdrop-blur"
            onClick={() => setPaused((value) => !value)}
          />
        </div>

        <AnimationPreview
          item={item}
          speed={speed}
          paused={paused}
          reducedMotion={reducedMotion}
          monospace={monospace}
          fontFamily={fontFamily}
          loopPreview
          className={cn(
            'pt-16 sm:pt-6',
            previewTheme === 'dark' ? 'border-black bg-black' : '',
          )}
          rendererClassName={previewTheme === 'dark' ? 'text-white' : ''}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-[10rem_auto_7rem] sm:items-start">
        <label className="text-muted-foreground grid gap-1.5 text-sm">
          <span className="h-5">Font stack</span>
          <Select
            value={fontStack}
            onChange={(event) =>
              setFontStack(event.target.value as RecommendedFontStack)
            }
          >
            {previewFontStackOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>

        <div className="grid justify-start gap-1.5">
          <span className="text-muted-foreground flex h-5 items-center gap-1.5 text-sm">
            Motion
            <Tooltip label="Reduced shows the safer static or slowed state used for people who prefer less motion.">
              <span className="border-border text-muted-foreground inline-grid size-4 place-items-center rounded-full border text-[0.65rem] leading-none">
                i
              </span>
            </Tooltip>
          </span>
          <SegmentedControl
            label="Motion mode"
            value={reducedMotion ? 'reduced' : 'motion'}
            onValueChange={(value) =>
              setMotionOverride(value === 'reduced' ? 'reduced' : 'motion')
            }
            items={[
              { label: 'Motion', value: 'motion' },
              { label: 'Reduced', value: 'reduced' },
            ]}
            className="w-fit"
          />
          <p className="text-muted-foreground max-w-xs text-xs leading-5">
            {reducedMotionGuidance}
          </p>
        </div>

        <label className="text-muted-foreground grid gap-1.5 text-sm">
          <span className="h-5">Speed</span>
          <Input
            type="number"
            min={item.options.speed?.min ?? 100}
            max={item.options.speed?.max ?? 5000}
            step={50}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

function ThemeToggle({
  value,
  onChange,
}: {
  value: 'light' | 'dark';
  onChange: () => void;
}) {
  const dark = value === 'dark';

  return (
    <button
      type="button"
      aria-label={`Switch preview to ${dark ? 'light' : 'dark'} theme`}
      aria-pressed={dark}
      onClick={onChange}
      className="glyphe-pressable border-border bg-background/90 text-muted-foreground hover:text-foreground focus-visible:ring-ring/20 relative inline-flex h-10 w-20 shrink-0 items-center justify-between rounded-full border px-2.5 backdrop-blur focus-visible:ring-4"
    >
      <MoonIcon className={dark ? 'text-white' : 'text-muted-foreground'} />
      <SunIcon className={dark ? 'text-muted-foreground' : 'text-white'} />
      <span
        className={cn(
          'absolute top-1.5 left-1.5 size-7 rounded-full bg-black transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out)]',
          'motion-reduce:transition-none',
          dark ? 'translate-x-0' : 'translate-x-10',
        )}
      />
    </button>
  );
}

function PauseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M8 5v14" />
      <path d="M16 5v14" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="m8 5 11 7-11 7Z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn('relative z-10 size-4 translate-x-px', className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M20.5 14.5A7.5 7.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn('relative z-10 size-4', className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
