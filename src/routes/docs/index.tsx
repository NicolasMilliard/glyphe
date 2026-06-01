import { OverviewPage } from '@/components/docs/overview-page';
import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/docs/')({
  component: DocsIndexPage,
});

function DocsIndexPage() {
  useDocumentTitle('Overview');

  return <OverviewPage />;
}
