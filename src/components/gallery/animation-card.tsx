import { Link } from '@tanstack/react-router';
import { AnimationPreview } from '@/components/animation';
import { CopyButton } from '@/components/ui';
import { generateCss } from '@/generator/css';
import { generateReactComponent } from '@/generator/react';
import { generateTailwindCss } from '@/generator/tailwind';
import { cn } from '@/lib/cn';
import type { RegistryItem } from '@/registry';

type AnimationCardProps = {
  item: RegistryItem;
  previewTheme?: 'light' | 'dark';
};

export function AnimationCard({
  item,
  previewTheme = 'light',
}: AnimationCardProps) {
  const detailSlug = item.slug.replace('/', '--');
  const badges = getCardBadges(item);
  const displayName = getDisplayName(item);

  return (
    <article className="glyphe-hover-lift hover:border-muted-foreground/35 rounded-glyphe-lg border-border bg-background grid min-w-0 overflow-hidden border">
      <AnimationPreview
        item={item}
        loopPreview
        className={cn(
          'h-32 min-h-0 rounded-none border-x-0 border-t-0 border-b p-4 sm:h-36',
          previewTheme === 'dark'
            ? 'border-black bg-black'
            : 'border-border bg-surface',
        )}
        rendererClassName={previewTheme === 'dark' ? 'text-white' : ''}
      />

      <div className="grid min-w-0 gap-4 p-4 sm:gap-5 sm:p-5">
        <div className="grid min-w-0 gap-2.5 sm:gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>

          <div className="min-w-0">
            <h2 className="text-foreground text-xl font-semibold">
              {displayName}
            </h2>
            <p className="text-muted-foreground mt-2 min-h-10 text-sm leading-6 sm:min-h-12">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
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
          className="glyphe-pressable text-foreground decoration-border hover:decoration-foreground rounded-glyphe-sm justify-self-start text-sm font-medium underline underline-offset-4"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

function toTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getDisplayName(item: RegistryItem) {
  return item.name.replace(/^Braille\s+/i, '');
}

function getCardBadges(item: RegistryItem) {
  const badges = [toTitleCase(item.category)];

  if (item.tags.includes('braille')) {
    badges.push('Braille');
  } else if (item.tags.includes('ascii')) {
    badges.push('ASCII');
  } else if (item.tags.includes('blocks')) {
    badges.push('Blocks');
  } else if (item.tags.includes('symbol')) {
    badges.push('Symbol');
  } else if (item.tags.includes('chromatic')) {
    badges.push('Chromatic');
  }

  if (item.compatibility.supportsCssOnly) {
    badges.push('CSS');
  }

  return badges.slice(0, 3);
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-glyphe-sm border-border bg-surface text-muted-foreground border px-1.5 py-0.5 font-mono text-[0.62rem] leading-4 uppercase">
      {children}
    </span>
  );
}
