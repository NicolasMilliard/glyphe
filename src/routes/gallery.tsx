import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { AnimationCard } from '@/components/gallery';
import { Input } from '@/components/ui';
import { cn } from '@/lib/cn';
import { routeMetadata } from '@/lib/routes';
import { useDocumentTitle } from '@/lib/use-document-title';
import { registryItems, type AnimationCategory } from '@/registry';

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
});

const categoryItems = [
  { label: 'All', value: 'all' },
  ...Array.from(new Set(registryItems.map((item) => item.category))).map(
    (category) => ({
      label: toTitleCase(category),
      value: category,
    }),
  ),
];

const tagItems = [
  { label: 'All', value: 'all' },
  { label: 'Unicode', value: 'unicode' },
  { label: 'ASCII', value: 'ascii' },
  { label: 'CSS-only', value: 'css-only' },
  { label: 'Text effect', value: 'text-effect' },
  { label: 'Loading', value: 'loading' },
];

function GalleryPage() {
  const metadata = routeMetadata.gallery;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<AnimationCategory | 'all'>('all');
  const [tag, setTag] = useState('all');
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  useDocumentTitle(metadata.title);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return registryItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesTag = matchesTagFilter(item, tag);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [category, query, tag]);

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
        <aside className="lg:sticky lg:top-24">
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
        </aside>

        <div className="grid min-w-0 gap-6">
          <div className="border-border bg-surface grid min-w-0 gap-4 border-y py-4">
            <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(14rem,20rem)_minmax(0,1fr)_auto] xl:items-center">
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

              <div
                className="flex min-w-0 gap-2 overflow-x-auto pb-1"
                aria-label="Filter animations by tag"
              >
                {tagItems.map((item) => (
                  <FilterChip
                    key={item.value}
                    active={tag === item.value}
                    onClick={() => setTag(item.value)}
                  >
                    {item.label}
                  </FilterChip>
                ))}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="text-muted-foreground text-sm">Preview</span>
                <div className="border-border bg-background rounded-glyphe-md inline-flex border p-1">
                  {(['light', 'dark'] as const).map((theme) => (
                    <FilterChip
                      key={theme}
                      active={previewTheme === theme}
                      onClick={() => setPreviewTheme(theme)}
                    >
                      {toTitleCase(theme)}
                    </FilterChip>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
                setTag('all');
              }}
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              Reset filters
            </button>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <AnimationCard
                  key={item.slug}
                  item={item}
                  previewTheme={previewTheme}
                />
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
      <div className="flex gap-1 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
        {children}
      </div>
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
        'rounded-glyphe-md shrink-0 px-3 py-2 text-left text-sm transition-colors',
        active
          ? 'bg-foreground text-background'
          : 'text-muted-foreground hover:bg-surface hover:text-foreground',
      )}
    >
      {children}
    </button>
  );
}

function FilterChip({
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
        'rounded-glyphe-md shrink-0 px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'bg-foreground text-background'
          : 'text-muted-foreground hover:bg-background hover:text-foreground',
      )}
    >
      {children}
    </button>
  );
}

function matchesTagFilter(item: (typeof registryItems)[number], tag: string) {
  if (tag === 'all') {
    return true;
  }

  if (tag === 'css-only') {
    return item.compatibility.supportsCssOnly;
  }

  if (tag === 'text-effect') {
    return item.category === 'text';
  }

  return item.tags.includes(tag);
}

function toTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
