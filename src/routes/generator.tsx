import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { AnimationPreview } from '@/components/animation';
import {
  Button,
  CopyButton,
  Input,
  SegmentedControl,
  Select,
  Tabs,
  Textarea,
} from '@/components/ui';
import { generateCss } from '@/generator/css';
import {
  getFrameInputMode,
  parseFrames,
  type FrameValidationMessage,
  validateFrameInput,
} from '@/generator/frames';
import { generateReactComponent } from '@/generator/react';
import { generateTailwindCss } from '@/generator/tailwind';
import { routeMetadata } from '@/lib/routes';
import {
  getUnicodeCompatibilityGuidance,
  hasNonAsciiCharacter,
} from '@/lib/unicode-compatibility';
import { useDocumentTitle } from '@/lib/use-document-title';
import { type RegistryItem, type RenderingStrategy } from '@/registry';
import { getGeneratorPresets } from '@/registry/presets';
import { renderingStrategies } from '@/registry/schema';

export const Route = createFileRoute('/generator')({
  component: GeneratorPage,
});

const exampleFrames = '⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏';
const strategyOptions = renderingStrategies.map((strategy) => ({
  label: strategy,
  value: strategy,
}));
const customPresetValue = 'custom';
const curatedPresets = getGeneratorPresets();

function GeneratorPage() {
  const metadata = routeMetadata.generator;
  const [presetSlug, setPresetSlug] = useState(customPresetValue);
  const [framesInput, setFramesInput] = useState(exampleFrames);
  const [duration, setDuration] = useState(800);
  const [timing, setTiming] = useState<'steps' | 'linear' | 'ease' | 'custom'>(
    'steps',
  );
  const [loop, setLoop] = useState(true);
  const [strategy, setStrategy] = useState<RenderingStrategy>('stacked-spans');
  const [codeTab, setCodeTab] = useState('css');
  useDocumentTitle(metadata.title);

  const frames = useMemo(() => parseFrames(framesInput), [framesInput]);
  const frameInputMode = getFrameInputMode(framesInput);
  const presetItem = useMemo(
    () =>
      presetSlug === customPresetValue
        ? undefined
        : curatedPresets.find((item) => item.slug === presetSlug),
    [presetSlug],
  );
  const validationMessages = validateFrameInput({
    value: framesInput,
    frames,
    duration,
  });
  const glyphWarnings = getGlyphWarnings(frames);
  const generatedItem = useMemo(
    () =>
      createGeneratedItem({
        frames,
        duration,
        timing,
        loop,
        strategy,
        presetItem,
      }),
    [duration, frames, loop, presetItem, strategy, timing],
  );

  const cssOutput = generateCss(generatedItem);
  const reactOutput = generateReactComponent(generatedItem, {
    componentName: 'GeneratedGlypheAnimation',
  });
  const tailwindOutput = generateTailwindCss(generatedItem);

  return (
    <section className="grid min-w-0 gap-8 sm:gap-10">
      <div className="max-w-3xl min-w-0">
        <h1 className="text-foreground text-4xl font-semibold sm:text-6xl">
          {metadata.title}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
          {metadata.description}
        </p>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-glyphe-lg border-border bg-surface grid min-w-0 gap-5 border p-4 sm:p-5">
          <div className="grid gap-2">
            <label
              htmlFor="preset"
              className="text-foreground text-sm font-medium"
            >
              Start from preset
            </label>
            <Select
              id="preset"
              value={presetSlug}
              onChange={(event) => {
                const nextPresetSlug = event.target.value;

                setPresetSlug(nextPresetSlug);

                if (nextPresetSlug === customPresetValue) {
                  return;
                }

                const nextPreset = curatedPresets.find(
                  (item) => item.slug === nextPresetSlug,
                );

                if (nextPreset) {
                  loadPreset(nextPreset, {
                    setFramesInput,
                    setDuration,
                    setTiming,
                    setLoop,
                    setStrategy,
                  });
                }
              }}
            >
              <option value={customPresetValue}>Custom frames</option>
              {curatedPresets.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name} ({item.slug})
                </option>
              ))}
            </Select>
            <p className="text-muted-foreground text-sm">
              Five teaching presets. Use the gallery when you want to browse
              every registry item.
            </p>
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="frames"
              className="text-foreground text-sm font-medium"
            >
              Frames
            </label>
            <Textarea
              id="frames"
              value={framesInput}
              onChange={(event) => setFramesInput(event.target.value)}
              spellCheck={false}
              className="min-h-32 font-mono"
            />
            <p className="text-muted-foreground text-sm">
              {frameInputMode === 'line'
                ? 'Line mode: each non-empty line is one frame, preserving internal spaces.'
                : 'Space mode: spaces separate frames. Use one frame per line for ASCII bars.'}
            </p>
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="text-foreground grid gap-2 text-sm font-medium">
              Duration
              <Input
                type="number"
                min={100}
                max={10000}
                step={50}
                value={duration}
                onChange={(event) => setDuration(Number(event.target.value))}
              />
            </label>

            <label className="text-foreground grid gap-2 text-sm font-medium">
              Timing
              <Select
                value={timing}
                onChange={(event) =>
                  setTiming(
                    event.target.value as
                      | 'steps'
                      | 'linear'
                      | 'ease'
                      | 'custom',
                  )
                }
              >
                <option value="steps">steps</option>
                <option value="linear">linear</option>
                <option value="ease">ease</option>
                <option value="custom">custom</option>
              </Select>
            </label>
          </div>

          <div className="grid min-w-0 gap-4">
            <div className="grid min-w-0 gap-2">
              <p className="text-foreground text-sm font-medium">
                Rendering strategy
              </p>
              <SegmentedControl
                label="Rendering strategy"
                value={strategy}
                onValueChange={(value) =>
                  setStrategy(value as RenderingStrategy)
                }
                items={strategyOptions}
                className="w-full"
              />
            </div>

            <label className="text-muted-foreground flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={loop}
                onChange={(event) => setLoop(event.target.checked)}
              />
              Loop animation
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => {
                setFramesInput(exampleFrames);
                setDuration(800);
                setTiming('steps');
                setLoop(true);
                setStrategy('stacked-spans');
                setPresetSlug(customPresetValue);
              }}
            >
              Reset example
            </Button>
            <p className="text-muted-foreground text-sm">
              {frames.length} frame{frames.length === 1 ? '' : 's'}
            </p>
          </div>

          {validationMessages.length > 0 ? (
            <ValidationMessageList
              title="Validation"
              items={validationMessages}
            />
          ) : null}

          {glyphWarnings.length > 0 ? (
            <MessageList title="Glyph warnings" items={glyphWarnings} />
          ) : null}
        </section>

        <section className="grid min-w-0 gap-5">
          <AnimationPreview
            key={getPreviewKey(generatedItem)}
            item={generatedItem}
          />

          <Tabs
            label="Generated output"
            value={codeTab}
            onValueChange={setCodeTab}
            items={[
              {
                label: 'CSS',
                value: 'css',
                content: (
                  <CodePanel
                    value={cssOutput}
                    label="Copy CSS"
                    title="CSS output"
                    bestFor="Best for dependency-free primitives and framework-agnostic projects."
                    motionSummary={getMotionSummary(generatedItem)}
                  />
                ),
              },
              {
                label: 'React',
                value: 'react',
                content: (
                  <CodePanel
                    value={reactOutput}
                    label="Copy React"
                    title="React component"
                    bestFor="Best when you want the markup, class hook, and accessibility label together."
                    motionSummary={getMotionSummary(generatedItem)}
                  />
                ),
              },
              {
                label: 'Tailwind',
                value: 'tailwind',
                content: (
                  <CodePanel
                    value={tailwindOutput}
                    label="Copy Tailwind"
                    title="Tailwind output"
                    bestFor="Best when animation tokens live in your Tailwind v4 stylesheet."
                    motionSummary={getMotionSummary(generatedItem)}
                  />
                ),
              },
            ]}
          />
        </section>
      </div>
    </section>
  );
}

function getGlyphWarnings(frames: string[]) {
  const item = createGeneratedItem({
    frames,
    duration: 800,
    timing: 'steps',
    loop: true,
    strategy: 'stacked-spans',
  });
  const guidance = getUnicodeCompatibilityGuidance(item);

  return [
    `Glyph width: ${guidance.glyphWidth}`,
    `Unicode risk: ${guidance.unicodeRisk}`,
    guidance.monospaceNote,
    guidance.fontFallbackNote,
    ...guidance.warnings,
  ];
}

function createGeneratedItem({
  frames,
  duration,
  timing,
  loop,
  strategy,
  presetItem,
}: {
  frames: string[];
  duration: number;
  timing: 'steps' | 'linear' | 'ease' | 'custom';
  loop: boolean;
  strategy: RenderingStrategy;
  presetItem?: RegistryItem;
}): RegistryItem {
  return {
    name: presetItem?.name ?? 'Generated Animation',
    slug: presetItem?.slug ?? 'custom/generated',
    category: presetItem?.category ?? 'spinner',
    description:
      presetItem?.description ??
      'A custom animation generated from user-provided frames.',
    tags: presetItem?.tags ?? ['custom', 'generated'],
    frames: frames.length > 0 ? frames : [''],
    duration: Number.isFinite(duration) && duration > 0 ? duration : 800,
    timing,
    loop,
    strategy,
    accessibility: {
      decorative: presetItem?.accessibility.decorative ?? true,
      defaultLabel: presetItem?.accessibility.defaultLabel ?? 'Loading',
      reducedMotion: presetItem?.accessibility.reducedMotion ?? 'first-frame',
      ariaHiddenRecommended:
        presetItem?.accessibility.ariaHiddenRecommended ?? true,
    },
    compatibility: {
      requiresMonospace: presetItem?.compatibility.requiresMonospace ?? true,
      unicodeSensitive: frames.some(hasNonAsciiCharacter),
      supportsCssOnly: strategy !== 'scripted',
      glyphWidth: presetItem?.compatibility.glyphWidth,
      unicodeRisk: presetItem?.compatibility.unicodeRisk,
      emojiRisk: presetItem?.compatibility.emojiRisk,
      recommendedFontStack:
        presetItem?.compatibility.recommendedFontStack ?? 'monospace',
      fontFallbackNotes: presetItem?.compatibility.fontFallbackNotes,
    },
    options: {
      speed: {
        default: duration,
        min: 100,
        max: 10000,
      },
      size: ['sm', 'md', 'lg'],
      color: ['currentColor', 'accent', 'muted'],
    },
  };
}

function loadPreset(
  item: RegistryItem,
  setters: {
    setFramesInput: (value: string) => void;
    setDuration: (value: number) => void;
    setTiming: (value: 'steps' | 'linear' | 'ease' | 'custom') => void;
    setLoop: (value: boolean) => void;
    setStrategy: (value: RenderingStrategy) => void;
  },
) {
  setters.setFramesInput(getPresetFramesInput(item));
  setters.setDuration(item.duration);
  setters.setTiming(item.timing);
  setters.setLoop(item.loop);
  setters.setStrategy(item.strategy);
}

function getPresetFramesInput(item: RegistryItem) {
  if (item.slug === 'text/typewriter') {
    return getTypewriterFrames('Glyphe').join('\n');
  }

  return (item.frames ?? [item.name]).join('\n');
}

function getTypewriterFrames(text: string) {
  return Array.from({ length: text.length }, (_value, index) =>
    text.slice(0, index + 1),
  );
}

function CodePanel({
  value,
  label,
  title,
  bestFor,
  motionSummary,
}: {
  value: string;
  label: string;
  title: string;
  bestFor: string;
  motionSummary: string;
}) {
  return (
    <div className="rounded-glyphe-lg border-border bg-background min-w-0 overflow-hidden border">
      <div className="border-border flex min-w-0 flex-wrap items-start justify-between gap-3 border-b p-3">
        <div className="grid min-w-0 gap-1">
          <p className="text-foreground text-sm font-medium">{title}</p>
          <p className="text-muted-foreground text-sm leading-6">{bestFor}</p>
          <p className="text-muted-foreground font-mono text-xs">
            {motionSummary}
          </p>
        </div>
        <CopyButton
          value={value}
          label={label}
          className="border-accent bg-accent text-accent-foreground hover:bg-accent/90 h-8 px-3 text-xs"
        />
      </div>
      <pre className="text-foreground max-h-[28rem] max-w-full overflow-auto p-4 text-sm leading-6">
        <code>{value}</code>
      </pre>
    </div>
  );
}

function getMotionSummary(item: RegistryItem) {
  const timing =
    item.timing === 'custom'
      ? 'custom timing variable'
      : `${item.timing} timing`;
  const loop = item.loop ? 'loops forever' : 'runs once and holds';

  return `${item.duration}ms · ${timing} · ${loop}`;
}

function getPreviewKey(item: RegistryItem) {
  return [
    item.slug,
    item.strategy,
    item.duration,
    item.timing,
    item.loop,
    item.frames?.join('\u0000'),
  ].join('|');
}

function ValidationMessageList({
  title,
  items,
}: {
  title: string;
  items: FrameValidationMessage[];
}) {
  return (
    <div className="rounded-glyphe-md border-border bg-background border p-3">
      <p className="text-foreground text-sm font-medium">{title}</p>
      <ul className="mt-2 grid gap-1 text-sm leading-6">
        {items.map((item) => (
          <li
            key={item.message}
            className={
              item.severity === 'error'
                ? 'text-danger'
                : 'text-orange-700 dark:text-orange-300'
            }
          >
            {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MessageList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-glyphe-md border-border bg-background border p-3">
      <p className="text-foreground text-sm font-medium">{title}</p>
      <ul className="text-muted-foreground mt-2 grid gap-1 text-sm leading-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
