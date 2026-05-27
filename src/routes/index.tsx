import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute, Link } from '@tanstack/react-router';

import { Button, Card, CardContent, Text } from '@/components/ui';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  useDocumentTitle();

  return (
    <section
      className="flex min-h-screen items-center justify-between gap-16"
      aria-labelledby="home-title"
    >
      <div className="flex flex-col gap-8">
        <Text
          id="home-title"
          intent="display"
          className="mb-4 font-serif sm:text-[8rem]"
        >
          Glyphe
        </Text>
        <div>
          <Text intent="lead" measure="narrow">
            Carefully crafted typography primitives that you can customize,
            extend, and build on.
          </Text>
          <Text intent="paragraph" tone="muted" weight="medium">
            Open Source. No Black Boxes.
          </Text>
        </div>
        <div className="flex items-center gap-6">
          <Button asChild size="lg">
            <Link to="/library">Browse Library</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/playground">Open Playground</Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <CardSection>
            <Text intent="h3" as="h2">
              Motion
            </Text>
            {/* TODO */}
            <p>Typewriter animation</p>
          </CardSection>
          <CardSection>
            <Text intent="h3" as="h2">
              States
            </Text>
            {/* TODO */}
            <p>Skeleton</p>
          </CardSection>
          <CardSection>
            <Text intent="h3" as="h2">
              Components
            </Text>
            <Text>Open source primitives with code you fully own.</Text>
            <Text intent="code">
              <Text intent="caption" className="text-code-component">
                {'<Text '}
              </Text>
              <Text intent="caption" className="text-code-attribute">
                {'intent'}
              </Text>
              <Text intent="caption" className="text-code-semantic">
                {'='}
              </Text>
              <Text
                intent="caption"
                className="text-code-variable"
              >{`'paragraph' `}</Text>
              <Text intent="caption" className="text-code-attribute">
                {'density'}
              </Text>
              <Text intent="caption" className="text-code-semantic">
                {'='}
              </Text>
              <Text
                intent="caption"
                className="text-code-variable"
              >{`'comfortable'`}</Text>
              <Text intent="caption" className="text-code-component">
                {'/>'}
              </Text>
            </Text>
          </CardSection>
        </CardContent>
      </Card>
    </section>
  );
}

const CardSection = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">{children}</div>
);
