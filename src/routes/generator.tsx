import { createFileRoute } from '@tanstack/react-router';
import { RoutePage } from '@/components/site/route-page';
import { routeMetadata } from '@/lib/routes';
import { useDocumentTitle } from '@/lib/use-document-title';

export const Route = createFileRoute('/generator')({
  component: GeneratorPage,
});

function GeneratorPage() {
  const metadata = routeMetadata.generator;
  useDocumentTitle(metadata.title);

  return <RoutePage metadata={metadata} />;
}
