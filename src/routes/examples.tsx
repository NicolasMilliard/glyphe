import { Link, createFileRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { AnimationPreview } from '@/components/animation';
import { routeMetadata } from '@/lib/routes';
import { useDocumentTitle } from '@/lib/use-document-title';
import { loaderWaveform } from '@/registry/items/loader-waveform';
import { progressAscii } from '@/registry/items/progress-ascii';
import { spinnerBraille } from '@/registry/items/spinner-braille';
import { textScramble } from '@/registry/items/text-scramble';
import { cursorBlock } from '@/registry/items/cursor-block';
import type { RegistryItem } from '@/registry';

export const Route = createFileRoute('/examples')({
  component: ExamplesPage,
});

function ExamplesPage() {
  const metadata = routeMetadata.examples;
  useDocumentTitle(metadata.title);

  return (
    <section className="grid min-w-0 gap-10">
      <div className="max-w-3xl min-w-0">
        <p className="text-accent mb-4 font-mono text-sm uppercase">
          {metadata.label}
        </p>
        <h1 className="text-foreground text-4xl font-semibold sm:text-6xl">
          {metadata.title}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
          Practical interface patterns built from the same registry primitives
          used by the gallery and generator.
        </p>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <ExampleCard
          title="Loading Button"
          description="A compact action button with a decorative spinner."
          item={spinnerBraille}
        >
          <button
            type="button"
            className="rounded-glyphe-md border-accent bg-accent text-accent-foreground inline-flex h-11 items-center gap-3 border px-4 text-sm font-medium"
          >
            <InlineAnimation item={spinnerBraille} />
            Saving changes
          </button>
        </ExampleCard>

        <ExampleCard
          title="Command Palette Row"
          description="A command-style result row with a loading affordance."
          item={loaderWaveform}
        >
          <div className="rounded-glyphe-md border-border bg-background grid min-w-0 gap-3 border p-4">
            <div className="flex min-w-0 items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-foreground text-sm font-medium">
                  Sync registry cache
                </p>
                <p className="text-muted-foreground mt-1 truncate text-xs">
                  Updating local animation metadata
                </p>
              </div>
              <InlineAnimation item={loaderWaveform} />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard
          title="Terminal Status Line"
          description="A quiet terminal-style line for background jobs."
          item={cursorBlock}
        >
          <div className="rounded-glyphe-md border-border bg-background text-foreground flex min-w-0 items-center gap-2 border p-4 font-mono text-sm">
            <span className="text-accent">$</span>
            <span className="min-w-0 truncate">building registry</span>
            <InlineAnimation item={cursorBlock} />
          </div>
        </ExampleCard>

        <ExampleCard
          title="Progress Indicator"
          description="An ASCII progress primitive with a stable status label."
          item={progressAscii}
        >
          <div className="rounded-glyphe-md border-border bg-background grid gap-3 border p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-foreground text-sm font-medium">
                Generating snippets
              </p>
              <p className="text-muted-foreground font-mono text-xs">72%</p>
            </div>
            <InlineAnimation item={progressAscii} />
          </div>
        </ExampleCard>

        <ExampleCard
          title="Text Reveal"
          description="A restrained text effect for resolving labels or headlines."
          item={textScramble}
          className="lg:col-span-2"
        >
          <div className="rounded-glyphe-md border-border bg-background grid gap-2 border p-5">
            <p className="text-muted-foreground font-mono text-xs uppercase">
              Deploy preview
            </p>
            <InlineAnimation item={textScramble} className="text-3xl" />
          </div>
        </ExampleCard>
      </div>
    </section>
  );
}

function ExampleCard({
  title,
  description,
  item,
  className,
  children,
}: {
  title: string;
  description: string;
  item: RegistryItem;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`rounded-glyphe-lg border-border bg-surface grid min-w-0 gap-5 border p-5 ${className ?? ''}`}
    >
      <div className="min-w-0">
        <p className="text-accent font-mono text-xs uppercase">{item.slug}</p>
        <h2 className="text-foreground mt-2 text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          {description}
        </p>
      </div>

      <div className="min-w-0">{children}</div>

      <Link
        to="/gallery/$slug"
        params={{ slug: item.slug.replace('/', '--') }}
        className="text-accent text-sm font-medium hover:underline"
      >
        View primitive
      </Link>
    </article>
  );
}

function InlineAnimation({
  item,
  className,
}: {
  item: RegistryItem;
  className?: string;
}) {
  return (
    <AnimationPreview
      item={item}
      loopPreview
      className={`inline-grid min-h-0 border-0 bg-transparent p-0 ${className ?? ''}`}
    />
  );
}
