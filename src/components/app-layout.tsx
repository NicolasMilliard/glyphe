import { Link, Outlet } from '@tanstack/react-router';

const navItems = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Generator', href: '#generator' },
  { label: 'Registry', href: '#registry' },
];

export function AppLayout() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border border-b">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-[var(--page-gutter)]">
          <Link
            to="/"
            className="text-foreground font-mono text-sm font-medium uppercase"
          >
            Glyphe
          </Link>

          <nav aria-label="Primary navigation" className="hidden sm:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="rounded-glyphe-md text-muted-foreground hover:bg-surface hover:text-foreground px-3 py-2 text-sm transition-colors focus-visible:outline-none"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-[var(--page-gutter)] py-[var(--section-gap)]">
        <Outlet />
      </main>

      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-2 px-[var(--page-gutter)] py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>Terminal-inspired motion primitives for the web.</p>
          <p className="font-mono text-xs uppercase">
            CSS-first · Ownable code
          </p>
        </div>
      </footer>
    </div>
  );
}
