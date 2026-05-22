import { createFileRoute } from '@tanstack/react-router';
import { RoutePage } from '@/components/site/route-page';
import { routeMetadata } from '@/lib/routes';
import { useDocumentTitle } from '@/lib/use-document-title';

export const Route = createFileRoute('/gallery/$slug')({
  component: AnimationDetailPage,
});

function AnimationDetailPage() {
  const { slug } = Route.useParams();
  const metadata = routeMetadata.animationDetail;
  useDocumentTitle(`${metadata.title}: ${slug}`);

  return (
    <RoutePage
      metadata={{
        ...metadata,
        title: slug,
      }}
      eyebrow={metadata.title}
    />
  );
}
