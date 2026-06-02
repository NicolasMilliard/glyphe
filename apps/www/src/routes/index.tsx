import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute, Link } from '@tanstack/react-router';

import {
  Button,
  Card,
  CardContent,
  Text,
  TextReveal,
  TextSkeleton,
  TypewriterText,
} from '@/components/ui';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  useDocumentTitle();

  return (
    <section
      className="flex flex-col items-center justify-between gap-16 px-4 py-8 sm:px-6 sm:py-12 lg:min-h-[calc(100svh-4.75rem)] lg:flex-row"
      aria-labelledby="home-title"
    >
      <div className="flex flex-col gap-8">
        <Text
          id="home-title"
          intent="display"
          className="glyphe-reveal font-serif sm:text-[8rem] lg:mb-4"
        >
          Glyphe
        </Text>
        <div className="glyphe-reveal [--glyphe-reveal-delay:90ms]">
          <Text intent="lead" measure="narrow">
            Carefully crafted typography primitives that you can customize,
            extend, and build on.
          </Text>
          <TypewriterText asChild delay="800ms" cursor={false}>
            <Text intent="caption" tone="muted" weight="medium">
              Open Source. No Black Boxes.
            </Text>
          </TypewriterText>
        </div>
        <div className="glyphe-reveal flex flex-wrap items-center gap-6 [--glyphe-reveal-delay:180ms]">
          <Button asChild size="lg">
            <Link to="/docs">Browse Docs</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/playground">Open Playground</Link>
          </Button>
        </div>
      </div>
      <Card
        role="complementary"
        className="glyphe-reveal-soft [--glyphe-reveal-delay:260ms]"
        aria-labelledby="home-preview-title"
      >
        <CardContent className="flex flex-col gap-4">
          <CardSection>
            <Text id="home-preview-title" intent="h3" as="h2">
              Motion
            </Text>
            <TextReveal effect="slide" delay="900ms">
              Text reveal effect
            </TextReveal>
            <TypewriterText delay="1500ms">Typewriter effect</TypewriterText>
          </CardSection>
          <CardSection>
            <Text intent="h3" as="h2">
              States
            </Text>
            <TextSkeleton lines={3} />
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
                {'leading'}
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
