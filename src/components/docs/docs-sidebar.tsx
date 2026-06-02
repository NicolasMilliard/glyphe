import { Link, useRouterState } from '@tanstack/react-router';
import { ChevronDownIcon } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';

type DocsSidebarLink = {
  label: string;
  to:
    | '/docs'
    | '/docs/installation'
    | '/docs/components/text'
    | '/docs/components/text-link'
    | '/docs/components/text-skeleton'
    | '/docs/components/typewriter-text'
    | '/docs/components/text-reveal';
};

type DocsSidebarGroup = {
  links: readonly DocsSidebarLink[];
  title: string;
};

const docsSidebarGroups: readonly DocsSidebarGroup[] = [
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
];

type DocsSidebarProps = {
  className?: string;
};

function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const currentLink = findCurrentDocsLink(pathname);

  return (
    <aside
      className={cn('min-w-0 md:sticky md:top-24 md:self-start', className)}
    >
      <MobileDocsNavigation
        key={pathname}
        currentLabel={currentLink?.label ?? 'Docs'}
      />
      <DesktopDocsNavigation />
    </aside>
  );
}

type MobileDocsNavigationProps = {
  currentLabel: string;
};

function MobileDocsNavigation({ currentLabel }: MobileDocsNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (containerRef.current?.contains(target)) {
        return;
      }

      setIsOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Escape') {
      return;
    }

    setIsOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className="z-40 px-4 py-3 sm:-mx-6 sm:px-6 md:hidden">
      <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={menuId}
          className="border-border bg-background focus-visible:ring-ring/30 hover:bg-muted/60 flex h-12 w-full items-center justify-between gap-4 rounded-xl border px-3 text-left text-sm font-medium transition-colors outline-none focus-visible:ring-3"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="truncate leading-5">{currentLabel}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              'text-muted-foreground size-4 shrink-0 transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {isOpen ? (
          <nav
            id={menuId}
            aria-label="Documentation navigation"
            className="border-border bg-background absolute top-[calc(100%+0.5rem)] right-0 left-0 z-50 max-h-[min(70svh,30rem)] overflow-y-auto rounded-xl border p-3 shadow-lg/5"
          >
            <DocsNavGroups onNavigate={() => setIsOpen(false)} />
          </nav>
        ) : null}
      </div>
    </div>
  );
}

function DesktopDocsNavigation() {
  return (
    <div className="hidden md:block">
      <nav
        aria-label="Documentation navigation"
        className="border-border max-h-[calc(100svh-7rem)] overflow-y-auto border-r pr-6"
      >
        <DocsNavGroups />
      </nav>
    </div>
  );
}

type DocsNavGroupsProps = {
  onNavigate?: () => void;
};

function DocsNavGroups({ onNavigate }: DocsNavGroupsProps) {
  return (
    <div className="grid gap-6">
      {docsSidebarGroups.map((group) => (
        <div key={group.title} className="grid gap-2">
          <Text intent="caption" tone="muted">
            {group.title}
          </Text>
          <ul className="grid gap-1">
            {group.links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className: 'bg-muted',
                  }}
                  inactiveProps={{
                    className: 'hover:bg-muted/70',
                  }}
                  className="focus-visible:ring-ring/30 block rounded-lg px-3 py-1.5 text-sm leading-6 font-medium transition-colors outline-none focus-visible:ring-3"
                  onClick={onNavigate}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function findCurrentDocsLink(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);

  return docsSidebarGroups
    .flatMap((group) => group.links)
    .find((link) => normalizePathname(link.to) === normalizedPathname);
}

function normalizePathname(pathname: string) {
  if (pathname === '/') {
    return pathname;
  }

  return pathname.replace(/\/+$/, '');
}

export { DocsSidebar };
