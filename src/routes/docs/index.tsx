import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute, Link } from '@tanstack/react-router';

import { Button, Card, CardContent, Text } from '@/components/ui';

export const Route = createFileRoute('/docs/')({
  component: DocsIndexPage,
});

function DocsIndexPage() {
  useDocumentTitle('Docs');

  return (
    <section className="space-y-10" aria-labelledby="docs-title">
      <div className="space-y-4">
        <Text id="docs-title" intent="h1" className="font-normal">
          Docs
        </Text>
        <Text intent="lead" measure="readable" tone="muted">
          Learn how Glyphe components keep typography readable, semantic, and
          easy to own in your project.
        </Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="glyphe-reveal-soft [--glyphe-reveal-delay:120ms]">
          <CardContent className="flex min-h-48 flex-col justify-between gap-6">
            <div className="space-y-3">
              <Text intent="h3" as="h2">
                Text
              </Text>
              <Text intent="paragraph" tone="muted">
                The base typography primitive for headings, prose, labels,
                captions, and inline code.
              </Text>
            </div>
            <Button asChild className="self-start">
              <Link to="/docs/components/text">Read Text docs</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="glyphe-reveal-soft [--glyphe-reveal-delay:180ms]">
          <CardContent className="flex min-h-48 flex-col justify-between gap-6">
            <div className="space-y-3">
              <Text intent="h3" as="h2">
                TextLink
              </Text>
              <Text intent="paragraph" tone="muted">
                Typographic anchor styles for inline links, external links, and
                accessible focus states.
              </Text>
            </div>
            <Button disabled variant="secondary" className="self-start">
              Coming soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
