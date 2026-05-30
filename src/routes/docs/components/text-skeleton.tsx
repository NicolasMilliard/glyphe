import { DocsComingSoon } from '@/components/docs/docs-coming-soon';
import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/docs/components/text-skeleton')({
  component: TextSkeletonDocsPage,
});

function TextSkeletonDocsPage() {
  useDocumentTitle('TextSkeleton');

  return (
    <DocsComingSoon
      title="TextSkeleton"
      description="A typographic loading state that preserves rhythm and remains decorative unless an accessible status is needed."
    />
  );
}
