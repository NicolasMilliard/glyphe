import { Link } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';

export function RootNotFound() {
  return (
    <section className="grid min-h-[calc(100vh-14rem)] items-center">
      <div className="max-w-2xl">
        <p className="text-accent mb-4 font-mono text-sm uppercase">404</p>
        <h1 className="text-foreground text-4xl font-semibold sm:text-6xl">
          This route is still uncharted.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-8">
          The page you are looking for is not part of the Glyphe map yet.
        </p>
        <Link
          to="/"
          className="rounded-glyphe-md border-border text-foreground hover:bg-surface mt-8 inline-flex border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}

export function RootErrorBoundary({ error, reset }: ErrorComponentProps) {
  return (
    <section className="grid min-h-[calc(100vh-14rem)] items-center">
      <div className="max-w-2xl">
        <p className="text-danger mb-4 font-mono text-sm uppercase">
          Runtime error
        </p>
        <h1 className="text-foreground text-4xl font-semibold sm:text-6xl">
          Something slipped out of tune.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-8">
          The app hit an unexpected error while rendering this route.
        </p>
        <pre className="rounded-glyphe-md border-danger/30 bg-danger/10 text-danger mt-6 max-h-48 overflow-auto border p-4 text-sm">
          {error.message}
        </pre>
        <button
          type="button"
          onClick={reset}
          className="rounded-glyphe-md border-border text-foreground hover:bg-surface mt-8 inline-flex border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
