import { AnimationPreview } from '@/components/animation';
import { siteConfig } from '@/lib/site';
import { useDocumentTitle } from '@/lib/use-document-title';
import { loaderWaveform } from '@/registry/items/loader-waveform';
import { spinnerBraille } from '@/registry/items/spinner-braille';
import { textGlitchSoft } from '@/registry/items/text-glitch-soft';
import { Link, createFileRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const showcaseItems = [
  {
    item: spinnerBraille,
    label: 'Unicode spinners',
    copy: 'Frame-based loaders with stable dimensions and reduced-motion metadata.',
  },
  {
    item: loaderWaveform,
    label: 'ASCII loaders',
    copy: 'Terminal-shaped motion that stays copyable as plain CSS.',
  },
  {
    item: textGlitchSoft,
    label: 'Text effects',
    copy: 'Readable animated primitives with accessibility notes built in.',
  },
];

function HomePage() {
  useDocumentTitle();

  return (
    <section className="grid min-w-0 gap-14">
      <div className="grid min-h-[calc(100vh-18rem)] min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)]">
        <div className="max-w-3xl min-w-0">
          <p className="text-accent mb-4 font-mono text-sm uppercase">
            Registry-first text motion
          </p>
          <h1 className="text-foreground font-[Georgia,'Times_New_Roman',serif] text-6xl leading-none font-medium tracking-normal sm:text-8xl lg:text-9xl">
            Glyphe
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
            {siteConfig.description} Browse primitives, inspect rendering and
            accessibility tradeoffs, then copy the code into your own app.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/gallery"
              className="glyphe-pressable rounded-glyphe-md border-accent bg-accent text-accent-foreground hover:bg-accent/90 inline-flex h-11 items-center justify-center border px-5 text-base font-medium whitespace-nowrap"
            >
              Browse gallery
            </Link>
            <Link
              to="/generator"
              className="glyphe-pressable rounded-glyphe-md border-border bg-surface text-foreground hover:bg-surface-strong inline-flex h-11 items-center justify-center border px-5 text-base font-medium whitespace-nowrap"
            >
              Open generator
            </Link>
          </div>
        </div>

        <div className="grid min-w-0 gap-3" aria-label="Animation showcase">
          {showcaseItems.map((showcaseItem) => (
            <article
              key={showcaseItem.item.slug}
              className="rounded-glyphe-lg border-border bg-surface grid min-w-0 gap-4 border p-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center"
            >
              <AnimationPreview
                item={showcaseItem.item}
                loopPreview
                className="min-h-28 rounded-none border-0 bg-transparent p-0"
              />
              <div className="min-w-0">
                <h2 className="text-foreground text-base font-semibold">
                  {showcaseItem.label}
                </h2>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  {showcaseItem.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <section className="border-border grid min-w-0 border-y py-8 sm:py-10">
        <div className="divide-border grid min-w-0 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          <Feature eyebrow="01" title="Registry">
            Structured animation metadata drives previews, generated code, docs,
            and future CLI installs.
          </Feature>
          <Feature eyebrow="02" title="CSS-first">
            Prefer plain CSS output, then generate React and Tailwind adapters
            from the same source.
          </Feature>
          <Feature eyebrow="03" title="Ownable">
            Copy readable code, keep it in your project, and customize it
            without inheriting a runtime dependency.
          </Feature>
        </div>
      </section>
    </section>
  );
}

function Feature({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid min-w-0 gap-5 py-6 first:pt-0 last:pb-0 lg:px-8 lg:py-0 lg:first:pl-0 lg:last:pr-0">
      <p className="text-muted-foreground font-mono text-xs uppercase">
        {eyebrow}
      </p>
      <div>
        <h2 className="text-foreground text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-6">
          {children}
        </p>
      </div>
    </section>
  );
}
