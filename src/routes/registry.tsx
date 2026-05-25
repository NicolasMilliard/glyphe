import { Link, createFileRoute } from '@tanstack/react-router';
import { routeMetadata } from '@/lib/routes';
import { useDocumentTitle } from '@/lib/use-document-title';
import { registryItems } from '@/registry';
import { animationCategories, renderingStrategies } from '@/registry/schema';

export const Route = createFileRoute('/registry')({
  component: RegistryPage,
});

function RegistryPage() {
  const metadata = routeMetadata.registry;
  useDocumentTitle(metadata.title);
  const strategyCounts = renderingStrategies
    .map((strategy) => ({
      strategy,
      count: registryItems.filter((item) => item.strategy === strategy).length,
    }))
    .filter((item) => item.count > 0);
  const cssOnlyCount = registryItems.filter(
    (item) => item.compatibility.supportsCssOnly,
  ).length;

  return (
    <section className="grid min-w-0 gap-10">
      <div className="max-w-3xl min-w-0">
        <h1 className="text-foreground text-4xl font-semibold sm:text-6xl">
          {metadata.title}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
          {metadata.description}
        </p>
      </div>

      <dl className="border-border divide-border grid min-w-0 divide-y border-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <StatItem label="Registry items" value={registryItems.length} />
        <StatItem label="Categories" value={animationCategories.length} />
        <StatItem label="CSS-only" value={cssOnlyCount} />
      </dl>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-glyphe-lg border-border bg-surface min-w-0 border p-5">
          <h2 className="text-foreground text-xl font-semibold">
            Registry shape
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            Each item is a typed source of truth for previews, generated CSS,
            React output, Tailwind snippets, accessibility notes, compatibility
            guidance, and future CLI installs.
          </p>
          <pre className="text-foreground bg-background border-border rounded-glyphe-md mt-5 max-w-full overflow-auto border p-4 text-sm leading-6">
            <code>{`{
  name: string
  slug: "category/name"
  frames?: string[]
  duration: number
  timing: "steps" | "linear" | "ease" | "custom"
  strategy: RenderingStrategy
  accessibility: AccessibilityMetadata
  compatibility: CompatibilityMetadata
}`}</code>
          </pre>
        </section>

        <section className="rounded-glyphe-lg border-border bg-surface min-w-0 border p-5">
          <h2 className="text-foreground text-xl font-semibold">
            Rendering strategies
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            Active strategies in the current registry. Planned strategies stay
            in the schema until an item needs them.
          </p>
          <div className="mt-5 grid gap-2">
            {strategyCounts.map((item) => (
              <div
                key={item.strategy}
                className="border-border bg-background rounded-glyphe-md flex items-center justify-between gap-4 border px-3 py-2"
              >
                <span className="text-foreground font-mono text-sm">
                  {item.strategy}
                </span>
                <span className="text-muted-foreground text-sm">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="grid min-w-0 gap-4">
        <div className="flex min-w-0 flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-foreground text-2xl font-semibold">
              Registry entries
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              A compact view of the primitives currently available.
            </p>
          </div>
          <Link
            to="/gallery"
            className="text-accent text-sm font-medium hover:underline"
          >
            Browse gallery
          </Link>
        </div>

        <div className="rounded-glyphe-lg border-border bg-surface min-w-0 overflow-hidden border">
          <div className="divide-border grid min-w-0 divide-y">
            {registryItems.map((item) => (
              <Link
                key={item.slug}
                to="/gallery/$slug"
                params={{ slug: item.slug.replace('/', '--') }}
                className="glyphe-pressable hover:bg-surface-strong grid min-w-0 gap-2 p-4 sm:grid-cols-[minmax(0,1fr)_8rem_10rem] sm:items-center"
              >
                <div className="min-w-0">
                  <p className="text-foreground font-medium">{item.name}</p>
                  <p className="text-muted-foreground mt-1 truncate font-mono text-xs">
                    {item.slug}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">{item.category}</p>
                <p className="text-muted-foreground truncate font-mono text-xs">
                  {item.strategy}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0">
      <dt className="text-muted-foreground font-mono text-xs uppercase">
        {label}
      </dt>
      <dd className="text-foreground mt-3 text-3xl font-semibold">{value}</dd>
    </div>
  );
}
