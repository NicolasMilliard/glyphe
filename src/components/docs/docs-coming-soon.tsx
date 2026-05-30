import { Link } from '@tanstack/react-router';

import { Button, Text } from '@/components/ui';

type DocsComingSoonProps = {
  description: string;
  eyebrow?: string;
  title: string;
};

function DocsComingSoon({
  description,
  eyebrow = 'Components',
  title,
}: DocsComingSoonProps) {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Text intent="caption" tone="muted" weight="medium">
          {eyebrow}
        </Text>
        <div className="space-y-3">
          <Text intent="h1" className="font-normal">
            {title}
          </Text>
          <Text intent="lead" measure="readable" tone="muted">
            {description}
          </Text>
        </div>
      </header>

      <section
        className="border-border bg-muted/30 rounded-xl border p-6"
        aria-labelledby="coming-soon-title"
      >
        <div className="space-y-4">
          <Text id="coming-soon-title" intent="h3" as="h2">
            Documentation coming soon
          </Text>
          <Text intent="paragraph" measure="readable" tone="muted">
            This route is ready so the documentation navigation can grow without
            changing the information architecture later.
          </Text>
          <Button asChild variant="secondary">
            <Link to="/docs/components/text">Read Text docs</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}

export { DocsComingSoon };
