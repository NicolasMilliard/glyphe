import { Link, Outlet } from '@tanstack/react-router';

const navItems = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Generator', href: '#generator' },
  { label: 'Registry', href: '#registry' },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="font-mono text-sm font-medium tracking-[0.2em] text-zinc-100 uppercase"
          >
            Glyphe
          </Link>

          <nav aria-label="Primary navigation" className="hidden sm:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:outline-none"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Terminal-inspired motion primitives for the web.</p>
          <p className="font-mono text-xs tracking-[0.16em] uppercase">
            CSS-first · Ownable code
          </p>
        </div>
      </footer>
    </div>
  );
}
