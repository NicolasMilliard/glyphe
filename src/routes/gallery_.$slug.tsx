import { Link, createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { AnimationPreviewWorkbench } from '@/components/animation';
import { CopyButton, Tabs } from '@/components/ui';
import { generateCss } from '@/generator/css';
import { generateReactComponent } from '@/generator/react';
import { generateTailwindCss } from '@/generator/tailwind';
import { getAccessibilityGuidance } from '@/lib/accessibility';
import { routeMetadata } from '@/lib/routes';
import { getUnicodeCompatibilityGuidance } from '@/lib/unicode-compatibility';
import { useDocumentTitle } from '@/lib/use-document-title';
import { getRegistryItem, registryItems } from '@/registry';

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

      <div className="grid min-w-0 gap-4 lg:grid-cols-3">
        <InfoSection title="Accessibility">
          <InfoList
            items={[
              `Mode: ${accessibility.mode}`,
              `Screen reader label: ${accessibility.label}`,
              accessibility.pattern,
              accessibility.reducedMotion,
              accessibility.pause,
              accessibility.flashingRisk,
              `ARIA hidden recommended: ${
                item.accessibility.ariaHiddenRecommended ? 'yes' : 'no'
              }`,
            ]}
          />
        </InfoSection>

        <InfoSection title="Compatibility">
          <InfoList
            items={[
              `Rendering strategy: ${item.strategy}`,
              `Glyph width: ${unicodeCompatibility.glyphWidth}`,
              `Unicode risk: ${unicodeCompatibility.unicodeRisk}`,
              `Emoji risk: ${unicodeCompatibility.emojiRisk}`,
              `Recommended font stack: ${unicodeCompatibility.recommendedFontStack}`,
              `Monospace recommended: ${
                item.compatibility.requiresMonospace ? 'yes' : 'no'
              }`,
              unicodeCompatibility.monospaceNote,
              unicodeCompatibility.fontFallbackNote,
              `CSS-only: ${item.compatibility.supportsCssOnly ? 'yes' : 'no'}`,
              ...unicodeCompatibility.warnings,
            ]}
          />
        </InfoSection>

        <InfoSection title="Customization">
          <InfoList
            items={[
              `Duration: ${item.duration}ms`,
              `Timing: ${item.timing}`,
              `Loop: ${item.loop ? 'yes' : 'no'}`,
              `Tags: ${item.tags.join(', ')}`,
            ]}
          />
        </InfoSection>
      </div>

      {brailleFamilyItems.length > 0 ? (
        <InfoSection title="Braille family">
          <p className="text-muted-foreground mb-4 text-sm leading-6">
            Explore the other braille-frame spinners in the registry.
          </p>
          <div className="flex flex-wrap gap-2">
            {brailleFamilyItems.map((brailleItem) => (
              <Link
                key={brailleItem.slug}
                to="/gallery/$slug"
                params={{ slug: brailleItem.slug.replace('/', '--') }}
                className="rounded-glyphe-md border-border bg-background text-foreground hover:bg-surface-strong border px-3 py-2 text-sm"
              >
                {brailleItem.name}
              </Link>
            ))}
          </div>
        </InfoSection>
      ) : null}

      <InfoSection title="Related animations">
        {relatedItems.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {relatedItems.map((relatedItem) => (
              <Link
                key={relatedItem.slug}
                to="/gallery/$slug"
                params={{ slug: relatedItem.slug.replace('/', '--') }}
                className="rounded-glyphe-md border-border bg-surface text-foreground hover:bg-surface-strong border px-3 py-2 text-sm"
              >
                {relatedItem.name}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            No related animations in this category yet.
          </p>
        )}
      </InfoSection>
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
      <pre className="text-foreground max-h-[28rem] max-w-full overflow-auto p-4 text-sm leading-6">
        <code>{value}</code>
      </pre>
    </div>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-glyphe-lg border-border bg-surface min-w-0 border p-5">
      <h2 className="text-foreground text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="text-muted-foreground grid gap-2 text-sm leading-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
