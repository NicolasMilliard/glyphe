import { Button } from '@/components/ui';
import { Link } from '@tanstack/react-router';

export function SiteHeader() {
  return (
    <header className="shadow-surface fixed top-0 z-50 h-19 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-10 px-6 py-5">
        <Link to="/" className="font-serif text-3xl tracking-[-0.04em] italic">
          G
        </Link>
        <nav className="flex items-center sm:gap-4">
          <Button asChild variant="ghost">
            <Link to="/docs">Docs</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/library">Library</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/playground">Playground</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
