import { Link } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';

export function RootNotFound() {
  return (
    <section className="grid min-h-[calc(100vh-14rem)] items-center">
      <div className="max-w-2xl">
        <p className="mb-4 font-mono text-sm tracking-[0.18em] text-teal-300 uppercase">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">
          This route is still uncharted.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
          The page you are looking for is not part of the Glyphe map yet.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:outline-none"
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
        <p className="mb-4 font-mono text-sm tracking-[0.18em] text-red-300 uppercase">
          Runtime error
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">
          Something slipped out of tune.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
          The app hit an unexpected error while rendering this route.
        </p>
        <pre className="mt-6 max-h-48 overflow-auto rounded-md border border-red-400/20 bg-red-950/20 p-4 text-sm text-red-100">
          {error.message}
        </pre>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:outline-none"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
