import { useDocumentTitle } from '@/lib/use-document-title';
import { createFileRoute, Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import {
  Button,
  Card,
  CardContent,
  Text,
  TextLink,
  TextReveal,
} from '@/components/ui';

export const Route = createFileRoute('/docs/components/text')({
  component: TextDocsPage,
});

const cliInstallCode = `npx glyphe@latest add text

# or
bunx glyphe@latest add text`;

const basicUsageCode = `import { Text } from '@/components/ui';

export function ArticleIntro() {
  return (
    <Text intent="paragraph" leading="comfortable" measure="readable">
      Typography should feel predictable before it feels expressive.
    </Text>
  );
}`;

const semanticUsageCode = `<Text intent="h3" as="h2">
  Motion
</Text>

<Text intent="label" htmlFor="email">
  Email
</Text>`;

const readabilityUsageCode = `<Text
  intent="lead"
  leading="comfortable"
  measure="narrow"
  wrap="balance"
>
  Compose readable interfaces without rebuilding typography rules.
</Text>`;

const inlineUsageCode = `<Text intent="paragraph" measure="readable">
  Read the <TextLink href="/docs/components/text-link">TextLink docs</TextLink> before
  styling links by hand.
</Text>`;

const propRows = [
  {
    name: 'intent',
    values:
      'display, h1, h2, h3, h4, h5, h6, paragraph, lead, small, label, caption, code',
    detail: 'Sets the typographic role and default semantic element.',
  },
  {
    name: 'as',
    values: 'React.ElementType',
    detail: 'Overrides the rendered element while keeping the visual intent.',
  },
  {
    name: 'leading',
    values: 'compact, default, comfortable',
    detail: 'Controls line height with readable defaults per intent.',
  },
  {
    name: 'measure',
    values: 'none, narrow, readable, wide',
    detail: 'Applies a max line length for more comfortable reading.',
  },
  {
    name: 'tone',
    values: 'foreground, muted, subtle, primary, destructive, inherit',
    detail: 'Maps text color to the design token vocabulary.',
  },
  {
    name: 'weight',
    values: 'inherit, normal, medium, semibold, bold',
    detail: 'Overrides the default font weight when the intent is not enough.',
  },
  {
    name: 'wrap',
    values: 'pretty, balance, normal, nowrap, break, truncate',
    detail: 'Controls wrapping behavior without reaching for custom CSS first.',
  },
  {
    name: 'align',
    values: 'start, center, end, justify',
    detail: 'Uses logical alignment, so start and end remain RTL-friendly.',
  },
  {
    name: 'className',
    values: 'string',
    detail: 'Keeps the escape hatch open for product-specific refinements.',
  },
] as const;

const practiceItems = [
  'Use intent for the visual system and as only when the semantic element needs to differ.',
  'Prefer measure="readable" for prose and measure="narrow" for short marketing copy.',
  'Keep headings semantic. If a visual h3 should be the next page heading, render it with as="h2".',
  'Use intent="label" with htmlFor for form controls. The type system enforces this pairing.',
  'Reach for className last, after intent, leading, measure, tone, weight, and wrap.',
] as const;

function TextDocsPage() {
  useDocumentTitle('Text');

  return (
    <article className="space-y-18 px-4 py-8 sm:px-6 sm:py-12">
      <header className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="glyphe-reveal space-y-6">
          <Text intent="caption" tone="muted" weight="medium">
            Components / Text
          </Text>
          <div className="space-y-5">
            <Text
              intent="display"
              measure="readable"
              className="font-serif sm:text-[7rem]"
            >
              Text
            </Text>
            <Text intent="lead" measure="readable" tone="muted">
              A small typography primitive for readable, semantic, and
              predictable interface text.
            </Text>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#installation">Install Text</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#examples">View Examples</a>
            </Button>
          </div>
        </div>

        <aside
          className="glyphe-reveal-soft border-border flex flex-col gap-3 border-l pl-5 [--glyphe-reveal-delay:140ms]"
          aria-label="Text component summary"
        >
          <Text intent="caption" tone="muted" weight="medium">
            At a glance
          </Text>
          <Text intent="small" tone="muted">
            Polymorphic, RTL-friendly, accessible by default, and designed to
            stay close to CSS naming.
          </Text>
        </aside>
      </header>

      <section
        id="installation"
        className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]"
        aria-labelledby="installation-title"
      >
        <SectionIntro
          title="Installation"
          id="installation-title"
          eyebrow="CLI"
        >
          The Glyphe CLI is planned for distribution. The command is shown now
          so the documentation can shape the product API early.
        </SectionIntro>
        <CodeBlock code={cliInstallCode} label="Planned CLI command" />
      </section>

      <section
        id="examples"
        className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]"
        aria-labelledby="examples-title"
      >
        <SectionIntro title="Examples" id="examples-title" eyebrow="Usage">
          Text should be boring in the best way: clear defaults, small
          overrides, and no hidden semantic surprises.
        </SectionIntro>

        <div className="grid gap-5">
          <Example title="Readable prose" code={basicUsageCode}>
            <Text intent="paragraph" leading="comfortable" measure="readable">
              Typography should feel predictable before it feels expressive.
              Text keeps the reading rhythm stable while still giving you room
              for product-specific polish.
            </Text>
          </Example>

          <Example
            title="Visual intent, semantic element"
            code={semanticUsageCode}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Text intent="caption" tone="muted" weight="medium">
                  Heading
                </Text>
                <Text intent="h3" as="h2">
                  Motion
                </Text>
                <Text intent="small" tone="muted">
                  Looks like an h3, renders as an h2.
                </Text>
              </div>
              <div className="space-y-2">
                <Text intent="label" htmlFor="email-preview">
                  Email
                </Text>
                <input
                  id="email-preview"
                  type="email"
                  placeholder="you@glyphe.dev"
                  className="border-border bg-background focus-visible:ring-ring/30 h-10 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-3"
                />
              </div>
            </div>
          </Example>

          <Example title="Reading controls" code={readabilityUsageCode}>
            <TextReveal asChild effect="slide">
              <Text
                intent="lead"
                leading="comfortable"
                measure="narrow"
                wrap="balance"
              >
                Compose readable interfaces without rebuilding typography rules
                for every screen.
              </Text>
            </TextReveal>
          </Example>

          <Example title="Inline composition" code={inlineUsageCode}>
            <Text intent="paragraph" measure="readable">
              Read the{' '}
              <TextLink href="/docs/components/text-link">
                TextLink docs
              </TextLink>{' '}
              before styling links by hand.
            </Text>
          </Example>
        </div>
      </section>

      <section
        id="api"
        className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]"
        aria-labelledby="api-title"
      >
        <SectionIntro title="API" id="api-title" eyebrow="Props">
          The API follows typography and CSS language where possible, with
          className available for local exceptions.
        </SectionIntro>
        <div className="border-border divide-border overflow-hidden rounded-xl border">
          {propRows.map((prop) => (
            <div
              key={prop.name}
              className="divide-border grid gap-0 divide-y sm:grid-cols-[9rem_minmax(0,1fr)] sm:divide-x sm:divide-y-0"
            >
              <div className="bg-muted/40 px-4 py-3">
                <Text intent="code">{prop.name}</Text>
              </div>
              <div className="space-y-1 px-4 py-3">
                <Text intent="small" weight="medium">
                  {prop.values}
                </Text>
                <Text intent="small" tone="muted">
                  {prop.detail}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="practices"
        className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]"
        aria-labelledby="practices-title"
      >
        <SectionIntro
          title="Best practices"
          id="practices-title"
          eyebrow="Guidance"
        >
          Text is intentionally scoped to typography. Reach for TextLink,
          TextSkeleton, or motion primitives when the job is no longer plain
          text.
        </SectionIntro>
        <ul className="grid gap-3">
          {practiceItems.map((item) => (
            <li
              key={item}
              className="border-border bg-card rounded-xl border px-4 py-3"
            >
              <Text intent="paragraph" leading="compact">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-border flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Text intent="h3" as="h2">
            Next component
          </Text>
          <Text intent="paragraph" tone="muted">
            TextLink will document typographic links with native anchor
            behavior.
          </Text>
        </div>
        <Button asChild variant="secondary">
          <Link to="/docs">Back to docs</Link>
        </Button>
      </footer>
    </article>
  );
}

type SectionIntroProps = {
  children: ReactNode;
  eyebrow: string;
  id: string;
  title: string;
};

function SectionIntro({ children, eyebrow, id, title }: SectionIntroProps) {
  return (
    <div className="space-y-3">
      <Text intent="caption" tone="muted" weight="medium">
        {eyebrow}
      </Text>
      <Text id={id} intent="h3" as="h2">
        {title}
      </Text>
      <Text intent="small" tone="muted">
        {children}
      </Text>
    </div>
  );
}

type ExampleProps = {
  children: ReactNode;
  code: string;
  title: string;
};

function Example({ children, code, title }: ExampleProps) {
  return (
    <Card>
      <CardContent className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="bg-muted/30 flex min-h-48 items-center rounded-lg p-6">
          {children}
        </div>
        <div className="grid gap-3">
          <Text intent="h4" as="h3">
            {title}
          </Text>
          <CodeBlock code={code} />
        </div>
      </CardContent>
    </Card>
  );
}

type CodeBlockProps = {
  code: string;
  label?: string;
};

function CodeBlock({ code, label }: CodeBlockProps) {
  return (
    <figure className="border-border bg-muted/30 overflow-hidden rounded-xl border">
      {label ? (
        <figcaption className="border-border border-b px-4 py-2">
          <Text intent="caption" tone="muted" weight="medium">
            {label}
          </Text>
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
