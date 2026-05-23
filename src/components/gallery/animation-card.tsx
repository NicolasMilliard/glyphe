import { Link } from '@tanstack/react-router';
import { AnimationPreview } from '@/components/animation';
import { CopyButton } from '@/components/ui';
import { generateCss } from '@/generator/css';
import { generateReactComponent } from '@/generator/react';
import { generateTailwindCss } from '@/generator/tailwind';
import type { RegistryItem } from '@/registry';

type AnimationCardProps = {
  item: RegistryItem;
};

export function AnimationCard({ item }: AnimationCardProps) {
  const detailSlug = item.slug.replace('/', '--');

  return (
    <article className="rounded-glyphe-lg border-border bg-background grid overflow-hidden border">
      <AnimationPreview
        item={item}
        className="min-h-44 rounded-none border-x-0 border-t-0 border-b"
      />

      <div className="grid gap-5 p-5">
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{item.category}</Badge>
            <Badge>
              {item.accessibility.decorative ? 'decorative' : 'status'}
            </Badge>
            <Badge>
              {item.compatibility.supportsCssOnly ? 'CSS-only' : 'scripted'}
            </Badge>
          </div>

          <div>
            <h2 className="text-foreground text-xl font-semibold">
              {item.name}
            </h2>
            <p className="text-muted-foreground mt-2 min-h-12 text-sm leading-6">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <CopyButton
            value={generateCss(item)}
            label="Copy CSS"
            className="h-8 px-3 text-xs"
          />
          <CopyButton
            value={generateReactComponent(item)}
            label="Copy React"
            className="h-8 px-3 text-xs"
          />
          <CopyButton
            value={generateTailwindCss(item)}
            label="Copy Tailwind"
            className="h-8 px-3 text-xs"
          />
        </div>

        <Link
          to="/gallery/$slug"
          params={{ slug: detailSlug }}
          className="text-accent text-sm font-medium hover:underline"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-glyphe-sm border-border bg-surface text-muted-foreground border px-2 py-1 font-mono text-xs uppercase">
      {children}
    </span>
  );
}
