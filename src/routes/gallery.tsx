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
  ...Array.from(new Set(registryItems.map((item) => item.category)))
    .sort((first, second) => first.localeCompare(second))
    .map((category) => ({
      label: toTitleCase(category),
      value: category,
    })),
];

const filterItems = [
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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  useDocumentTitle(metadata.title);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return registryItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesFilters = selectedFilters.every((filter) =>
        matchesFilter(item, filter),
      );
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesFilters && matchesQuery;
    });
  }, [category, query, selectedFilters]);

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

          <FilterGroup label="Filters">
            {filterItems.map((item) => (
              <FilterCheckbox
                key={item.value}
                checked={
                  item.value === 'all'
                    ? selectedFilters.length === 0
                    : selectedFilters.includes(item.value)
                }
                onChange={() => {
                  if (item.value === 'all') {
                    setSelectedFilters([]);
                    return;
                  }

                  setSelectedFilters((filters) =>
                    filters.includes(item.value)
                      ? filters.filter((filter) => filter !== item.value)
                      : [...filters, item.value],
                  );
                }}
              >
                {item.label}
              </FilterCheckbox>
            ))}
          </FilterGroup>
        </aside>

        <div className="grid min-w-0 gap-6">
          <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(14rem,24rem)_auto] sm:items-center sm:justify-between">
            <div className="min-w-0">
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

            <ThemeToggle
              value={previewTheme}
              onChange={() =>
                setPreviewTheme((theme) =>
                  theme === 'light' ? 'dark' : 'light',
                )
              }
            />
          </div>

          {selectedFilters.length > 0 ? (
            <div className="flex min-w-0 flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setSelectedFilters((filters) =>
                      filters.filter((item) => item !== filter),
                    )
                  }
                  className="rounded-glyphe-md border-border bg-surface text-muted-foreground hover:text-foreground border px-3 py-1.5 text-sm transition-colors"
                >
                  {getFilterLabel(filter)} ×
                </button>
              ))}
            </div>
          ) : null}

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
                setSelectedFilters([]);
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

function FilterCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="text-muted-foreground hover:text-foreground rounded-glyphe-md hover:bg-surface flex shrink-0 cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-foreground size-3.5"
      />
      {children}
    </label>
  );
}

function ThemeToggle({
  value,
  onChange,
}: {
  value: 'light' | 'dark';
  onChange: () => void;
}) {
  const dark = value === 'dark';

  return (
    <button
      type="button"
      aria-label={`Switch preview to ${dark ? 'light' : 'dark'} theme`}
      aria-pressed={dark}
      onClick={onChange}
      className="border-border bg-background text-muted-foreground hover:text-foreground relative inline-flex h-10 w-20 shrink-0 items-center justify-between rounded-full border px-2.5 transition-colors"
    >
      <MoonIcon className={dark ? 'text-white' : 'text-muted-foreground'} />
      <SunIcon className={dark ? 'text-muted-foreground' : 'text-white'} />
      <span
        className={cn(
          'absolute top-1.5 left-1.5 size-7 rounded-full bg-black transition-transform',
          dark ? 'translate-x-0' : 'translate-x-10',
        )}
      />
    </button>
  );
}

function matchesFilter(item: (typeof registryItems)[number], filter: string) {
  if (filter === 'css-only') {
    return item.compatibility.supportsCssOnly;
  }

  if (filter === 'text-effect') {
    return item.category === 'text';
  }

  return item.tags.includes(filter);
}

function getFilterLabel(value: string) {
  return (
    filterItems.find((item) => item.value === value)?.label ??
    toTitleCase(value)
  );
}

function toTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn('relative z-10 size-4', className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M20.5 14.5A7.5 7.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn('relative z-10 size-4', className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
