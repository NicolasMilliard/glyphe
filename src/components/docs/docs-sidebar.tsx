import { Link } from '@tanstack/react-router';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';

const docsSidebarGroups = [
  {
    title: 'Getting Started',
    links: [
      { label: 'Overview', to: '/docs' },
      { label: 'Installation', to: '/docs/installation' },
    ],
  },
  {
    title: 'Components',
    links: [
      { label: 'Text', to: '/docs/components/text' },
      { label: 'TextLink', to: '/docs/components/text-link' },
      {
        label: 'TextSkeleton',
        to: '/docs/components/text-skeleton',
      },
    ],
  },
  {
    title: 'Motion',
    links: [
      {
        label: 'TypewriterText',
        to: '/docs/components/typewriter-text',
      },
      { label: 'TextReveal', to: '/docs/components/text-reveal' },
    ],
  },
] as const;

type DocsSidebarProps = {
  className?: string;
};

function DocsSidebar({ className }: DocsSidebarProps) {
  return (
    <aside className={cn('min-w-0', className)}>
      <nav
        aria-label="Documentation navigation"
        className="border-border grid gap-6 border-b pb-6 lg:sticky lg:top-24 lg:border-r lg:border-b-0 lg:pr-6 lg:pb-0"
      >
        {docsSidebarGroups.map((group) => (
          <div key={group.title} className="grid gap-2">
            <Text intent="caption" weight="medium">
              {group.title}
            </Text>
            <ul className="grid gap-1">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    activeOptions={{ exact: true }}
                    activeProps={{
                      className: 'bg-muted text-foreground',
                    }}
                    inactiveProps={{
                      className:
                        'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
                    }}
                    className="focus-visible:ring-ring/30 block rounded-lg px-2 py-1.5 text-sm leading-6 transition-colors outline-none focus-visible:ring-3"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export { DocsSidebar };
