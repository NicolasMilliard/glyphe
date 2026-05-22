import { createFileRoute } from '@tanstack/react-router';
import { DocsContent } from '@/components/site/docs-content';
import { routeMetadata } from '@/lib/routes';
import { useDocumentTitle } from '@/lib/use-document-title';

export const Route = createFileRoute('/docs')({
  component: DocsPage,
});

function DocsPage() {
  const metadata = routeMetadata.docs;
  useDocumentTitle(metadata.title);

  return (
    <DocsContent>
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>
      <h2>Registry first</h2>
      <p>
        Glyphe will use structured animation metadata to generate previews, CSS,
        React components, Tailwind-friendly output, and future CLI installs.
      </p>
    </DocsContent>
  );
}
