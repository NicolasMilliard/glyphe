import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-zinc-950 px-6 text-zinc-50">
      <section className="max-w-3xl">
        <p className="mb-4 font-mono text-sm tracking-[0.18em] text-teal-300 uppercase">
          Registry-first text motion
        </p>
        <h1 className="text-6xl font-semibold tracking-tight sm:text-8xl">
          Glyphe
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          A CSS-first toolkit for terminal-inspired animations, built with Vite,
          React, TypeScript, Tailwind CSS, and TanStack Router.
        </p>
      </section>
    </main>
  );
}
