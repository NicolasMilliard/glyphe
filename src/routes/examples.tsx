import {
  ScriptedRenderer,
  StackedSpansRenderer,
  TransformRenderer,
} from '@/components/animation';
import { cn } from '@/lib/cn';
import { routeMetadata } from '@/lib/routes';
import { useDocumentTitle } from '@/lib/use-document-title';
import type { RegistryItem } from '@/registry';
import { cursorBlock } from '@/registry/items/cursor-block';
import { loaderWaveform } from '@/registry/items/loader-waveform';
import { progressAscii } from '@/registry/items/progress-ascii';
import { spinnerBraille } from '@/registry/items/spinner-braille';
import { textScramble } from '@/registry/items/text-scramble';
import { Link, createFileRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

export const Route = createFileRoute('/examples')({
  component: ExamplesPage,
});

function ExamplesPage() {
  const metadata = routeMetadata.examples;
  useDocumentTitle(metadata.title);

  return (
    <section className="grid min-w-0 gap-10">
      <div className="max-w-3xl min-w-0">
        <h1 className="text-foreground text-4xl font-semibold sm:text-6xl">
          {metadata.title}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
          Practical interface patterns built from the same registry primitives
          used by the gallery and generator.
        </p>
      </div>

      <div className="min-w-0">
        <section className="border-border bg-background rounded-glyphe-lg min-w-0 overflow-hidden border">
          <div className="border-border flex min-w-0 flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="text-foreground font-mono text-sm font-medium">
                glyphe.config.ts
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                Registry install, local build, preview handoff.
              </p>
            </div>
            <button
              type="button"
              className="rounded-glyphe-md border-accent bg-accent text-accent-foreground glyphe-pressable inline-flex h-10 items-center gap-3 border px-4 text-sm font-medium"
            >
              <InlineAnimation
                item={spinnerBraille}
                className="text-accent-foreground text-base"
              />
              Saving changes
            </button>
          </div>

          <div className="grid min-w-0">
            <div className="divide-border min-w-0 divide-y">
              <FlowStep
                index="01"
                title="Save animation config"
                copy="Inline motion confirms the action without taking over the interface."
                item={spinnerBraille}
                side={
                  <span className="text-foreground flex items-center gap-2 font-mono text-sm">
                    <InlineAnimation
                      item={spinnerBraille}
                      className="text-base"
                    />
                    saving
                  </span>
                }
              />
              <FlowStep
                index="02"
                title="Sync registry cache"
                copy="The command row stays readable while the loader sits at the edge."
                item={loaderWaveform}
                side={
                  <InlineAnimation item={loaderWaveform} className="text-xl" />
                }
              />
              <FlowStep
                index="03"
                title="Build local output"
                copy="A terminal cursor gives the background job a tiny heartbeat."
                item={cursorBlock}
                side={
                  <span className="text-foreground flex items-center gap-2 font-mono text-sm">
                    <span className="text-accent">$</span>
                    build
                    <InlineAnimation item={cursorBlock} className="text-sm" />
                  </span>
                }
              />
            </div>

            <div className="border-border bg-background grid min-w-0 gap-0 border-t md:grid-cols-2">
              <div className="grid min-w-0 gap-4">
                <div className="p-5">
                  <ExampleIntro
                    index="04"
                    title="Generate snippets"
                    copy="ASCII progress stays inspectable while the code is produced."
                    item={progressAscii}
                  />
                  <div className="mt-5 grid gap-3">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-foreground text-sm font-medium">
                        CSS + React + Tailwind
                      </p>
                      <p className="text-muted-foreground font-mono text-xs">
                        72%
                      </p>
                    </div>
                    <InlineAnimation
                      item={progressAscii}
                      className="max-w-full overflow-hidden text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="border-border grid min-w-0 gap-4 border-t md:border-t-0 md:border-l">
                <div className="p-5">
                  <ExampleIntro
                    index="05"
                    title="Reveal preview"
                    copy="Use text effects when the content itself is the event."
                    item={textScramble}
                  />
                  <div className="mt-5 grid min-w-0 gap-2">
                    <p className="text-muted-foreground font-mono text-xs uppercase">
                      Deploy preview
                    </p>
                    <InlineAnimation
                      item={textScramble}
                      className="max-w-full overflow-hidden text-4xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function ExampleIntro({
  index,
  title,
  copy,
  item,
}: {
  index: string;
  title: string;
  copy: string;
  item: RegistryItem;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-3">
        <p className="text-muted-foreground font-mono text-xs uppercase">
          {index}
        </p>
        <PrimitiveLink item={item} />
      </div>
      <h2 className="text-foreground mt-3 text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-2 text-sm leading-6">{copy}</p>
    </div>
  );
}

function FlowStep({
  index,
  title,
  copy,
  item,
  side,
}: {
  index: string;
  title: string;
  copy: string;
  item: RegistryItem;
  side: ReactNode;
}) {
  return (
    <div className="grid min-w-0 gap-4 px-4 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5">
      <ExampleIntro index={index} title={title} copy={copy} item={item} />
      <div className="text-muted-foreground sm:justify-self-end">{side}</div>
    </div>
  );
}

function PrimitiveLink({ item }: { item: RegistryItem }) {
  return (
    <Link
      to="/gallery/$slug"
      params={{ slug: item.slug.replace('/', '--') }}
      className="glyphe-pressable text-muted-foreground hover:text-foreground decoration-border hover:decoration-foreground rounded-glyphe-sm font-mono text-xs underline underline-offset-4"
    >
      {item.slug}
    </Link>
  );
}

function InlineAnimation({
  item,
  className,
}: {
  item: RegistryItem;
  className?: string;
}) {
  const rendererClassName = cn('inline-grid min-h-0', className);

  if (item.tags.includes('braille')) {
    return <BrailleDotAnimation item={item} className={className} />;
  }

  switch (item.strategy) {
    case 'stacked-spans':
      return <StackedSpansRenderer item={item} className={rendererClassName} />;
    case 'css-var-swap':
    case 'pseudo-content':
    case 'scripted':
      return (
        <ScriptedRenderer
          item={item}
          loopPreview
          className={rendererClassName}
        />
      );
    case 'transform':
      return <TransformRenderer item={item} className={rendererClassName} />;
  }
}

function BrailleDotAnimation({
  item,
  className,
}: {
  item: RegistryItem;
  className?: string;
}) {
  const frames = useMemo(() => item.frames ?? [item.name], [item]);
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveFrame((frame) => (frame + 1) % frames.length);
    }, item.duration / frames.length);

    return () => window.clearInterval(interval);
  }, [frames.length, item.duration]);

  const mask = getBrailleMask(frames[activeFrame] ?? frames[0] ?? '');

  return (
    <span
      aria-hidden={item.accessibility.ariaHiddenRecommended}
      className={cn(
        'inline-grid grid-cols-2 grid-rows-4 gap-x-[0.08em] gap-y-[0.07em] align-[-0.08em]',
        className,
      )}
    >
      {brailleDotBits.map((bit) => (
        <span
          key={bit}
          className={cn(
            'size-[0.19em] rounded-full',
            mask & bit ? 'bg-current' : 'bg-transparent',
          )}
        />
      ))}
    </span>
  );
}

const brailleDotBits = [1, 8, 2, 16, 4, 32, 64, 128];

function getBrailleMask(frame: string) {
  const codePoint = frame.codePointAt(0) ?? 0;

  if (codePoint < 0x2800 || codePoint > 0x28ff) {
    return 0;
  }

  return codePoint - 0x2800;
}
