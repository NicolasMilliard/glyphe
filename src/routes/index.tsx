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
        <p className="text-accent mb-4 font-mono text-sm uppercase">
          Registry-first text motion
        </p>
        <h1 className="text-6xl font-semibold sm:text-8xl">Glyphe</h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
          {siteConfig.description}
        </p>
      </div>
    </section>
  );
}
