import { DocsComingSoon } from '@/components/docs/docs-coming-soon';
import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/docs/components/text-link')({
  component: TextLinkDocsPage,
});

function TextLinkDocsPage() {
  useDocumentTitle('TextLink');

  return (
    <DocsComingSoon
      title="TextLink"
      description="A typographic anchor component for inline links, external links, and accessible focus states."
    />
  );
}
