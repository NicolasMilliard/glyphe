import { DocsComingSoon } from '@/components/docs/docs-coming-soon';
import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/docs/installation')({
  component: InstallationDocsPage,
});

function InstallationDocsPage() {
  useDocumentTitle('Installation');

  return (
    <DocsComingSoon
      eyebrow="Getting Started"
      title="Installation"
      description="Install Glyphe components through the planned CLI and keep the generated code inside your own project."
    />
  );
}
