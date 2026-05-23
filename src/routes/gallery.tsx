import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { AnimationCard } from '@/components/gallery';
import { Input } from '@/components/ui';
import { cn } from '@/lib/cn';
import { routeMetadata } from '@/lib/routes';
import { useDocumentTitle } from '@/lib/use-document-title';
import { registryItems, type AnimationCategory } from '@/registry';
import { animationCategories } from '@/registry/schema';

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
});

const categoryItems = [
  { label: 'All', value: 'all' },
  ...animationCategories.map((category) => ({
    label: category,
    value: category,
  })),
];

const familyItems = [
  { label: 'All families', value: 'all' },
  { label: 'Braille', value: 'braille' },
  { label: 'Text effects', value: 'text-effects' },
  { label: 'Progress', value: 'progress' },
  { label: 'Terminal', value: 'terminal' },
  { label: 'General', value: 'general' },
];

const tagItems = [
  { label: 'All tags', value: 'all' },
  { label: 'Unicode', value: 'unicode' },
  { label: 'ASCII', value: 'ascii' },
  { label: 'Loading', value: 'loading' },
  { label: 'Effect', value: 'effect' },
  { label: 'CSS-only', value: 'css-only' },
];

function GalleryPage() {
  const metadata = routeMetadata.gallery;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<AnimationCategory | 'all'>('all');
  const [family, setFamily] = useState('all');
  const [tag, setTag] = useState('all');
  useDocumentTitle(metadata.title);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return registryItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesFamily = family === 'all' || getItemFamily(item) === family;
      const matchesTag =
        tag === 'all' ||
        item.tags.includes(tag) ||
        (tag === 'css-only' && item.compatibility.supportsCssOnly);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesFamily && matchesTag && matchesQuery;
    });
  }, [category, family, query, tag]);

  const brailleItems = useMemo(
    () => registryItems.filter((item) => getItemFamily(item) === 'braille'),
    [],
  );

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

      <div className="grid min-w-0 gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start">
        <aside className="grid min-w-0 gap-6 lg:sticky lg:top-24">
          <div className="grid gap-2">
            <label htmlFor="gallery-search" className="sr-only">
              Search animations
            </label>
            <Input
              id="gallery-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search animations"
              className="min-w-0"
            />
          </div>

          <FilterGroup label="Families">
            {familyItems.map((item) => (
              <FilterNavButton
                key={item.value}
                active={family === item.value}
                onClick={() => setFamily(item.value)}
              >
                {item.label}
              </FilterNavButton>
            ))}
          </FilterGroup>

          <FilterGroup label="Categories">
            {categoryItems.map((item) => (
              <FilterNavButton
                key={item.value}
                active={category === item.value}
                onClick={() =>
                  setCategory(item.value as AnimationCategory | 'all')
                }
              >
                {item.label}
              </FilterNavButton>
            ))}
          </FilterGroup>

          <FilterGroup label="Tags">
            {tagItems.map((item) => (
              <FilterNavButton
                key={item.value}
                active={tag === item.value}
                onClick={() => setTag(item.value)}
              >
                {item.label}
              </FilterNavButton>
            ))}
          </FilterGroup>
        </aside>

        <div className="grid min-w-0 gap-6">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
            <p className="text-muted-foreground text-sm">
              Showing {filteredItems.length} of {registryItems.length}{' '}
              animations.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
                setFamily('all');
                setTag('all');
              }}
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              Reset filters
            </button>
          </div>

          {family === 'braille' || tag === 'unicode' ? (
            <section className="border-border bg-surface grid min-w-0 gap-4 border-y py-5">
              <div className="max-w-2xl min-w-0">
                <p className="text-accent font-mono text-xs uppercase">
                  Braille collection
                </p>
                <h2 className="text-foreground mt-2 text-2xl font-semibold">
                  Braille motion systems
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {brailleItems.length} unicode braille animations built from
                  single-cell frames, all CSS-only and reduced-motion aware.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {brailleItems.slice(0, 12).map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => {
                      setFamily('braille');
                      setQuery(item.name.replace(/^Braille\s+/i, ''));
                    }}
                    className="rounded-glyphe-md border-border bg-background text-foreground hover:bg-surface-strong border px-3 py-2 text-sm"
                  >
                    {item.name.replace(/^Braille\s+/i, '')}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {filteredItems.length > 0 ? (
            <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <AnimationCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-glyphe-lg border-border bg-surface border p-8">
              <h2 className="text-foreground text-xl font-semibold">
                No animations found.
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Try a different category or search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={label} className="grid gap-2">
      <p className="text-muted-foreground font-mono text-xs uppercase">
        {label}
      </p>
      <div className="grid gap-1">{children}</div>
    </nav>
  );
}

function FilterNavButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-glyphe-md px-3 py-2 text-left text-sm transition-colors',
        active
          ? 'bg-foreground text-background'
          : 'text-muted-foreground hover:bg-surface hover:text-foreground',
      )}
    >
      {children}
    </button>
  );
}

function getItemFamily(item: (typeof registryItems)[number]) {
  if (item.tags.includes('braille')) {
    return 'braille';
  }

  if (item.category === 'text') {
    return 'text-effects';
  }

  if (item.category === 'progress') {
    return 'progress';
  }

  if (item.tags.includes('terminal') || item.category === 'cursor') {
    return 'terminal';
  }

  return 'general';
}
