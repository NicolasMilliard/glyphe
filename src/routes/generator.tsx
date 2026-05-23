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
import { parseFrames } from '@/generator/frames';
import { generateReactComponent } from '@/generator/react';
import { generateTailwindCss } from '@/generator/tailwind';
import { routeMetadata } from '@/lib/routes';
import {
  getUnicodeCompatibilityGuidance,
  hasNonAsciiCharacter,
} from '@/lib/unicode-compatibility';
import { useDocumentTitle } from '@/lib/use-document-title';
import type { RegistryItem, RenderingStrategy } from '@/registry';
import { renderingStrategies } from '@/registry/schema';

export const Route = createFileRoute('/generator')({
  component: GeneratorPage,
});

const exampleFrames = '⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏';
const strategyOptions = renderingStrategies.map((strategy) => ({
  label: strategy,
  value: strategy,
}));

function GeneratorPage() {
  const metadata = routeMetadata.generator;
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
  const validationMessages = getValidationMessages(frames, duration);
  const glyphWarnings = getGlyphWarnings(frames);
  const generatedItem = useMemo(
    () => createGeneratedItem({ frames, duration, timing, loop, strategy }),
    [duration, frames, loop, strategy, timing],
  );

  const cssOutput = generateCss(generatedItem);
  const reactOutput = generateReactComponent(generatedItem, {
    componentName: 'GeneratedGlypheAnimation',
  });
  const tailwindOutput = generateTailwindCss(generatedItem);

  return (
    <section className="grid min-w-0 gap-8 sm:gap-10">
      <div className="max-w-3xl min-w-0">
        <p className="text-accent mb-4 font-mono text-sm uppercase">
          {metadata.label}
        </p>
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
              Separate frames with spaces or line breaks.
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
              }}
            >
              Reset example
            </Button>
            <p className="text-muted-foreground text-sm">
              {frames.length} frame{frames.length === 1 ? '' : 's'}
            </p>
          </div>

          {validationMessages.length > 0 ? (
            <MessageList title="Validation" items={validationMessages} />
          ) : null}

          {glyphWarnings.length > 0 ? (
            <MessageList title="Glyph warnings" items={glyphWarnings} />
          ) : null}
        </section>

        <section className="grid min-w-0 gap-5">
          <AnimationPreview item={generatedItem} />

          <Tabs
            label="Generated output"
            value={codeTab}
            onValueChange={setCodeTab}
            items={[
              {
                label: 'CSS',
                value: 'css',
                content: <CodePanel value={cssOutput} label="Copy CSS" />,
              },
              {
                label: 'React',
                value: 'react',
                content: <CodePanel value={reactOutput} label="Copy React" />,
              },
              {
                label: 'Tailwind',
                value: 'tailwind',
                content: (
                  <CodePanel value={tailwindOutput} label="Copy Tailwind" />
                ),
              },
            ]}
          />
        </section>
      </div>
    </section>
  );
}

function getValidationMessages(frames: string[], duration: number) {
  const messages: string[] = [];

  if (frames.length === 0) {
    messages.push('Add at least one frame.');
  }

  if (duration < 100) {
    messages.push('Duration should be at least 100ms.');
  }

  if (new Set(frames).size !== frames.length) {
    messages.push('Duplicate frames are allowed, but may make motion unclear.');
  }

  return messages;
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
}: {
  frames: string[];
  duration: number;
  timing: 'steps' | 'linear' | 'ease' | 'custom';
  loop: boolean;
  strategy: RenderingStrategy;
}): RegistryItem {
  return {
    name: 'Generated Animation',
    slug: 'custom/generated',
    category: 'spinner',
    description: 'A custom animation generated from user-provided frames.',
    tags: ['custom', 'generated'],
    frames: frames.length > 0 ? frames : [''],
    duration: Number.isFinite(duration) && duration > 0 ? duration : 800,
    timing,
    loop,
    strategy,
    accessibility: {
      decorative: true,
      defaultLabel: 'Loading',
      reducedMotion: 'first-frame',
      ariaHiddenRecommended: true,
    },
    compatibility: {
      requiresMonospace: true,
      unicodeSensitive: frames.some(hasNonAsciiCharacter),
      supportsCssOnly: strategy !== 'scripted',
      recommendedFontStack: 'monospace',
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

function CodePanel({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-glyphe-lg border-border bg-background min-w-0 overflow-hidden border">
      <div className="border-border flex min-w-0 flex-wrap items-center justify-between gap-2 border-b p-3">
        <p className="text-muted-foreground font-mono text-xs uppercase">
          Generated output
        </p>
        <CopyButton value={value} label={label} className="h-8 px-3 text-xs" />
      </div>
      <pre className="text-foreground max-h-[28rem] max-w-full overflow-auto p-4 text-sm leading-6">
        <code>{value}</code>
      </pre>
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
