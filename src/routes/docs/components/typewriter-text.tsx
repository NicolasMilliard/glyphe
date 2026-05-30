import { DocsComingSoon } from '@/components/docs/docs-coming-soon';
import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/docs/components/typewriter-text')({
  component: TypewriterTextDocsPage,
});

function TypewriterTextDocsPage() {
  useDocumentTitle('TypewriterText');

  return (
    <DocsComingSoon
      eyebrow="Motion"
      title="TypewriterText"
      description="A text motion component for typewriter-style feedback that respects reduced motion preferences."
    />
  );
}
