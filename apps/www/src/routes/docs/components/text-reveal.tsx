import { DocsComingSoon } from '@/components/docs/docs-coming-soon';
import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/docs/components/text-reveal')({
  component: TextRevealDocsPage,
});

function TextRevealDocsPage() {
  useDocumentTitle('TextReveal');

  return (
    <DocsComingSoon
      eyebrow="Motion"
      title="TextReveal"
      description="A subtle reveal primitive for bringing text into view without taking attention away from reading."
    />
  );
}
