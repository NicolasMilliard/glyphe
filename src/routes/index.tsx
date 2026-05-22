import { createFileRoute } from '@tanstack/react-router';
import { siteConfig } from '@/lib/site';
import { useDocumentTitle } from '@/lib/use-document-title';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  useDocumentTitle();

  return (
    <section className="grid min-h-[calc(100vh-14rem)] items-center">
      <div className="max-w-3xl">
        <p className="mb-4 font-mono text-sm tracking-[0.18em] text-teal-300 uppercase">
          Registry-first text motion
        </p>
        <h1 className="text-6xl font-semibold tracking-tight sm:text-8xl">
          Glyphe
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          {siteConfig.description}
        </p>
      </div>
    </section>
  );
}
