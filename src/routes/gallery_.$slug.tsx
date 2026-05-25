import {
  AnimationPreview,
  AnimationPreviewWorkbench,
} from '@/components/animation';
import { CopyButton, Tabs } from '@/components/ui';
import { generateCss } from '@/generator/css';
import { generateReactComponent } from '@/generator/react';
import { generateTailwindCss } from '@/generator/tailwind';
import { getAccessibilityGuidance } from '@/lib/accessibility';
import { routeMetadata } from '@/lib/routes';
import { getUnicodeCompatibilityGuidance } from '@/lib/unicode-compatibility';
import { useDocumentTitle } from '@/lib/use-document-title';
import { getRegistryItem, registryItems, type RegistryItem } from '@/registry';
import { Link, createFileRoute } from '@tanstack/react-router';
import { type ReactNode, useMemo, useState } from 'react';

export const Route = createFileRoute('/gallery_/$slug')({
  component: AnimationDetailPage,
});

function AnimationDetailPage() {
  const { slug } = Route.useParams();
  const item = getRegistryItem(slug.replace('--', '/'));
  const metadata = routeMetadata.animationDetail;
  const [codeTab, setCodeTab] = useState('css');
  useDocumentTitle(item ? `${item.name} - ${metadata.title}` : metadata.title);

  const relatedItems = useMemo(() => {
    if (!item) {
      return [];
    }

    return registryItems
      .filter(
        (candidate) =>
          candidate.slug !== item.slug && candidate.category === item.category,
      )
      .slice(0, 3);
  }, [item]);
  const brailleFamilyItems = useMemo(() => {
    if (!item?.tags.includes('braille')) {
      return [];
    }

    return registryItems.filter(
      (candidate) =>
        candidate.slug !== item.slug && candidate.tags.includes('braille'),
    );
  }, [item]);

  if (!item) {
    return (
      <section className="max-w-2xl">
        <h1 className="text-foreground text-4xl font-semibold">
          Animation not found.
        </h1>
        <p className="text-muted-foreground mt-4">
          The registry does not include an animation for this slug yet.
        </p>
        <Link
          to="/gallery"
          className="glyphe-pressable text-muted-foreground hover:text-foreground decoration-border hover:decoration-foreground rounded-glyphe-sm mt-8 inline-flex items-center text-sm font-medium underline underline-offset-4"
        >
          <ChevronLeftIcon />
          Back to gallery
        </Link>
      </section>
    );
  }

  const accessibility = getAccessibilityGuidance(item);
  const unicodeCompatibility = getUnicodeCompatibilityGuidance(item);
  const visibleFamilyItems = brailleFamilyItems.slice(0, 8);

  return (
    <section className="grid min-w-0 gap-10">
      <header className="grid min-w-0 gap-5">
        <Link
          to="/gallery"
          className="glyphe-pressable text-muted-foreground hover:text-foreground decoration-border hover:decoration-foreground rounded-glyphe-sm inline-flex items-center justify-self-start text-sm font-medium underline underline-offset-4"
        >
          <ChevronLeftIcon />
          Back to gallery
        </Link>

        <div className="max-w-3xl min-w-0">
          <h1 className="text-foreground text-4xl font-semibold sm:text-6xl">
            {item.name}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
            {item.description}
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-6">
            {getUsageNote(item)}{' '}
            <DocsAnchor href="/docs#installation-usage">
              Usage guidance
            </DocsAnchor>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/registry"
              className="glyphe-pressable text-muted-foreground hover:text-foreground decoration-border hover:decoration-foreground rounded-glyphe-sm inline-flex text-sm font-medium underline underline-offset-4"
            >
              Registry metadata
            </Link>
            <DocsAnchor href="/docs#registry-metadata">
              Metadata docs
            </DocsAnchor>
          </div>
        </div>
      </header>

      <AnimationPreviewWorkbench item={item} />

      <Tabs
        label="Generated code"
        value={codeTab}
        onValueChange={setCodeTab}
        items={[
          {
            label: 'CSS',
            value: 'css',
            content: (
              <CodePanel
                value={generateCss(item)}
                label="Copy CSS"
                docsHref="/docs#installation-usage"
              />
            ),
          },
          {
            label: 'React',
            value: 'react',
            content: (
              <CodePanel
                value={generateReactComponent(item)}
                label="Copy React"
                docsHref="/docs#accessibility"
              />
            ),
          },
          {
            label: 'Tailwind',
            value: 'tailwind',
            content: (
              <CodePanel
                value={generateTailwindCss(item)}
                label="Copy Tailwind"
                docsHref="/docs#tailwind-integration"
              />
            ),
          },
        ]}
      />

      <section className="grid min-w-0 gap-6">
        <SectionIntro
          title="Implementation notes"
          copy="The practical bits to check before copying this primitive into an interface."
        />

        <div className="border-border divide-border grid min-w-0 divide-y border-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          <NoteSection
            kicker="Access"
            title="Keep the animation quiet."
            body={`${accessibility.pattern} Use “${accessibility.label}” as the stable readable label when the motion communicates state.`}
            facts={[
              `Mode: ${accessibility.mode}`,
              item.accessibility.ariaHiddenRecommended
                ? 'Hide moving frames'
                : 'Readable text stays exposed',
              accessibility.flashingRisk,
            ]}
            docsHref="/docs#accessibility"
            docsLabel="Accessibility docs"
          />

          <NoteSection
            kicker="Compose"
            title="Copy it without a runtime."
            body={`${item.strategy} rendering with ${unicodeCompatibility.recommendedFontStack} font guidance. ${unicodeCompatibility.monospaceNote}`}
            facts={[
              item.compatibility.supportsCssOnly ? 'CSS-only' : 'Scripted',
              `Glyph width: ${unicodeCompatibility.glyphWidth}`,
              `Unicode risk: ${unicodeCompatibility.unicodeRisk}`,
            ]}
            docsHref="/docs#unicode-rendering"
            docsLabel="Unicode docs"
          />

          <NoteSection
            kicker="Tune"
            title="Adjust the motion token."
            body={`Default timing is ${item.duration}ms with ${item.timing} easing. ${
              item.loop
                ? 'It is designed to loop.'
                : 'It resolves to a final state.'
            }`}
            facts={[
              `Duration: ${item.duration}ms`,
              `Timing: ${item.timing}`,
              item.loop ? 'Loops' : 'Resolves',
              ...item.tags.slice(0, 3),
            ]}
            docsHref="/docs#generator-output"
            docsLabel="Generator docs"
          />
        </div>
      </section>

      {brailleFamilyItems.length > 0 ? (
        <section className="grid min-w-0 gap-4">
          <SectionIntro
            title="Braille family"
            copy="A few nearby braille-frame motions with the same compact, single-cell feel."
          />
          <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visibleFamilyItems.map((brailleItem) => (
              <AnimationTile key={brailleItem.slug} item={brailleItem} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid min-w-0 gap-4">
        <SectionIntro
          title="Related animations"
          copy="Same category, different rhythm."
        />
        {relatedItems.length > 0 ? (
          <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedItems.map((relatedItem) => (
              <AnimationTile key={relatedItem.slug} item={relatedItem} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            No related animations in this category yet.
          </p>
        )}
      </section>
    </section>
  );
}

function CodePanel({
  value,
  label,
  docsHref,
}: {
  value: string;
  label: string;
  docsHref: string;
}) {
  return (
    <div className="rounded-glyphe-lg border-border bg-background min-w-0 overflow-hidden border">
      <div className="border-border flex min-w-0 flex-wrap items-center justify-between gap-2 border-b p-3">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <p className="text-muted-foreground font-mono text-xs uppercase">
            Generated output
          </p>
          <DocsAnchor href={docsHref}>Output docs</DocsAnchor>
        </div>
        <CopyButton
          value={value}
          label={label}
          className="border-accent bg-accent text-accent-foreground hover:bg-accent/90 h-8 px-3 text-xs"
        />
      </div>
      <pre className="text-foreground max-h-112 max-w-full overflow-auto p-4 text-sm leading-6">
        <code>{value}</code>
      </pre>
    </div>
  );
}

function SectionIntro({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-foreground text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-2 text-sm leading-6">{copy}</p>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mr-1 size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function AnimationTile({ item }: { item: RegistryItem }) {
  return (
    <Link
      to="/gallery/$slug"
      params={{ slug: item.slug.replace('/', '--') }}
      className="glyphe-pressable glyphe-hover-lift border-border bg-background hover:bg-surface rounded-glyphe-lg grid min-w-0 grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 border p-2.5 sm:p-3"
    >
      <AnimationPreview
        item={item}
        loopPreview
        className="rounded-glyphe-md bg-surface min-h-14 border-0 p-0"
      />
      <div className="min-w-0">
        <p className="text-foreground truncate text-sm font-medium">
          {getDisplayName(item)}
        </p>
        <p className="text-muted-foreground mt-1 truncate font-mono text-xs">
          {item.category}
        </p>
      </div>
    </Link>
  );
}

function getDisplayName(item: RegistryItem) {
  return item.name.replace(/^Braille\s+/i, '');
}

function getUsageNote(item: RegistryItem) {
  switch (item.category) {
    case 'spinner':
      return 'Use it for compact loading states where the surrounding text explains what is happening.';
    case 'loader':
      return 'Use it near background work, sync states, or compact interface feedback.';
    case 'progress':
      return 'Use it when progress should stay text-native and easy to inspect.';
    case 'cursor':
      return 'Use it inside prompt, typing, or terminal-style text surfaces.';
    case 'text':
      return 'Use it when the text itself is the moment, and keep the final copy readable.';
    case 'matrix':
      return 'Use it for dense ambient text effects, with extra care around motion and contrast.';
  }
}

function DocsAnchor({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="glyphe-pressable text-muted-foreground hover:text-foreground decoration-border hover:decoration-foreground rounded-glyphe-sm inline-flex text-sm font-medium underline underline-offset-4"
    >
      {children}
    </a>
  );
}

function NoteSection({
  kicker,
  title,
  body,
  facts,
  docsHref,
  docsLabel,
}: {
  kicker: string;
  title: string;
  body: string;
  facts: string[];
  docsHref: string;
  docsLabel: string;
}) {
  return (
    <section className="grid min-w-0 content-start gap-5 py-5 lg:px-6 lg:first:pl-0 lg:last:pr-0">
      <div>
        <p className="text-muted-foreground font-mono text-xs uppercase">
          {kicker}
        </p>
        <h3 className="text-foreground mt-2 text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-3 text-sm leading-6">{body}</p>
        <div className="mt-3">
          <DocsAnchor href={docsHref}>{docsLabel}</DocsAnchor>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {facts.map((fact) => (
          <span
            key={fact}
            className="rounded-glyphe-sm border-border bg-background text-muted-foreground border px-2 py-1 font-mono text-xs"
          >
            {fact}
          </span>
        ))}
      </div>
    </section>
  );
}
