import { cn } from '@/lib/cn';
import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { siteNavItems } from './nav';

export function SiteHeader() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border border-b">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-(--page-gutter)">
        <Link
          to="/"
          className="text-foreground font-mono text-sm font-medium uppercase"
          onClick={() => setOpen(false)}
        >
          Glyphe
        </Link>

        <nav aria-label="Primary navigation" className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {siteNavItems.map((item) => {
              const active =
                pathname === item.to || pathname.startsWith(`${item.to}/`);

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      'glyphe-pressable rounded-glyphe-md px-3 py-2 text-sm',
                      active
                        ? 'bg-surface text-foreground'
                        : 'text-muted-foreground hover:bg-surface hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="glyphe-pressable rounded-glyphe-md border-border text-muted-foreground hover:bg-surface hover:text-foreground border px-3 py-2 text-sm sm:hidden"
        >
          Menu
        </button>
      </div>

      {open ? (
        <nav
          aria-label="Mobile navigation"
          className="border-border border-t px-(--page-gutter) py-3 sm:hidden"
        >
          <ul className="grid gap-1">
            {siteNavItems.map((item) => {
              const active =
                pathname === item.to || pathname.startsWith(`${item.to}/`);

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'glyphe-pressable rounded-glyphe-md block px-3 py-2 text-sm',
                      active
                        ? 'bg-surface text-foreground'
                        : 'text-muted-foreground hover:bg-surface hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
