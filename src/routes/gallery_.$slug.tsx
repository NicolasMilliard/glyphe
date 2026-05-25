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
import { useMemo, useState } from 'react';

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
          className="text-accent mt-8 inline-flex text-sm font-medium hover:underline"
        >
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
          className="text-accent justify-self-start text-sm font-medium hover:underline"
        >
          Back to gallery
        </Link>

        <div className="max-w-3xl min-w-0">
          <h1 className="text-foreground text-4xl font-semibold sm:text-6xl">
            {item.name}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
            {item.description}
          </p>
          <Link
            to="/registry"
            className="glyphe-pressable text-muted-foreground hover:text-foreground decoration-border hover:decoration-foreground rounded-glyphe-sm mt-4 inline-flex text-sm font-medium underline underline-offset-4"
          >
            Registry metadata
          </Link>
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
            content: <CodePanel value={generateCss(item)} label="Copy CSS" />,
          },
          {
            label: 'React',
            value: 'react',
            content: (
              <CodePanel
                value={generateReactComponent(item)}
                label="Copy React"
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
              />
            ),
          },
        ]}
      />

      <section className="grid min-w-0 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-foreground text-2xl font-semibold">
            Implementation notes
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            The practical bits to check before copying this primitive into an
            interface.
          </p>
        </div>

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
              `Tags: ${item.tags.join(', ')}`,
            ]}
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

function CodePanel({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-glyphe-lg border-border bg-background min-w-0 overflow-hidden border">
      <div className="border-border flex min-w-0 flex-wrap items-center justify-between gap-2 border-b p-3">
        <p className="text-muted-foreground font-mono text-xs uppercase">
          Generated output
        </p>
        <CopyButton value={value} label={label} className="h-8 px-3 text-xs" />
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

function AnimationTile({ item }: { item: RegistryItem }) {
  return (
    <Link
      to="/gallery/$slug"
      params={{ slug: item.slug.replace('/', '--') }}
      className="glyphe-pressable glyphe-hover-lift border-border bg-background hover:bg-surface rounded-glyphe-lg grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-3 border p-3"
    >
      <AnimationPreview
        item={item}
        loopPreview
        className="rounded-glyphe-md bg-surface min-h-16 border-0 p-0"
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

function NoteSection({
  kicker,
  title,
  body,
  facts,
}: {
  kicker: string;
  title: string;
  body: string;
  facts: string[];
}) {
  return (
    <section className="grid min-w-0 content-start gap-5 py-5 lg:px-6 lg:first:pl-0 lg:last:pr-0">
      <div>
        <p className="text-muted-foreground font-mono text-xs uppercase">
          {kicker}
        </p>
        <h3 className="text-foreground mt-2 text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-3 text-sm leading-6">{body}</p>
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
