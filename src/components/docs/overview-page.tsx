import {
  coreIdeas,
  defaultValues,
  primitives,
  quickExampleCode,
} from '@/content/docs/overview';
import { Link } from '@tanstack/react-router';

import { DocsCodeBlock } from '@/components/docs/docs-code-block';
import { DocsSection } from '@/components/docs/docs-section';
import { DocsTable, type DocsTableColumn } from '@/components/docs/docs-table';
import { Button, Card, CardContent, Text } from '@/components/ui';

const primitiveColumns = [
  {
    header: 'Primitive',
    render: (primitive) => <Text intent="code">{primitive.name}</Text>,
  },
  {
    header: 'Use for',
    render: (primitive) => (
      <Text intent="small" weight="medium">
        {primitive.role}
      </Text>
    ),
  },
  {
    header: 'Details',
    render: (primitive) => (
      <Text intent="small" tone="muted">
        {primitive.detail}
      </Text>
    ),
  },
] satisfies readonly DocsTableColumn<(typeof primitives)[number]>[];

function OverviewPage() {
  return (
    <article className="space-y-18" aria-labelledby="overview-title">
      <header className="space-y-5">
        <Text id="overview-title" intent="h1">
          Overview
        </Text>
        <Text intent="lead" measure="readable" tone="muted">
          Typography primitives for React interfaces that need readable text,
          semantic HTML, and design-system friendly variants.
        </Text>
      </header>

      <DocsSection id="why-glyphe" title="Why Glyphe?">
        <div className="space-y-5">
          <Text leading="comfortable" measure="readable">
            Typography drift is rarely dramatic. It starts with one local
            heading class, then another muted color, then a loading state that
            collapses the layout while content is still on the way.
          </Text>
          <Text leading="comfortable" measure="readable">
            A simple <Text intent="code">{'<Text />'}</Text> wrapper helps, but
            it only solves the first layer. Glyphe treats typography as a small
            system: text, links, loading placeholders, and text motion share one
            vocabulary instead of growing separate APIs.
          </Text>
        </div>
      </DocsSection>

      <DocsSection id="own-the-code" title="Own the code">
        <div className="space-y-5">
          <Text leading="comfortable" measure="readable">
            Typography sits close to your design system. It is where product
            voice, spacing, color tokens, semantics, and motion all meet. That
            layer should not be locked behind an implementation you can only
            configure from the outside.
          </Text>
          <Text leading="comfortable" measure="readable">
            Glyphe is designed around code you can bring into your app, then
            edit. Change the variants. Replace the classes. Keep the API shape
            that works for your team. The primitive is the starting point, not a
            boundary.
          </Text>
        </div>
      </DocsSection>

      <DocsSection id="primitives" title="Primitives">
        <Text leading="comfortable" measure="readable">
          Glyphe is intentionally narrow. Each primitive solves one typography
          problem and stays open for you to own in your app.
        </Text>
        <DocsTable
          columns={primitiveColumns}
          getRowKey={(primitive) => primitive.name}
          rows={primitives}
        />
      </DocsSection>

      <DocsSection
        id="core-ideas"
        title="Core ideas"
        description="Glyphe exposes the decisions you repeat most often and leaves the rest close to React and CSS."
      >
        <CoreIdeasList />
      </DocsSection>

      <DocsSection
        id="defaults"
        title="Defaults"
        description="Defaults are chosen to make the first version useful without turning them into rules you cannot change."
      >
        <DefaultValuesList />
      </DocsSection>

      <DocsSection
        id="quick-example"
        title="Small example"
        description="A typical component starts by naming the typography decision, then reaches for classes only when the local design needs it."
      >
        <Card>
          <CardContent className="space-y-5">
            <div className="bg-muted/30 rounded-lg p-6">
              <header className="space-y-4">
                <Text intent="h1" measure="narrow" wrap="balance">
                  Ship typography that keeps its shape.
                </Text>
                <Text
                  intent="lead"
                  leading="comfortable"
                  measure="readable"
                  tone="muted"
                >
                  Use named typography decisions instead of repeating one-off
                  classes.
                </Text>
              </header>
            </div>
            <DocsCodeBlock code={quickExampleCode} />
          </CardContent>
        </Card>
      </DocsSection>

      <DocsSection id="ai-ready" title="Readable by tools">
        <div className="space-y-5">
          <Text leading="comfortable" measure="readable">
            Open component code is easier for AI tools to inspect than a closed
            runtime API. The model can see the variants, tokens, defaults, and
            composition patterns that your app actually uses.
          </Text>
          <Text leading="comfortable" measure="readable">
            That matters when you ask for a new text state, a local variant, or
            a refactor across typography usage. The output can follow your
            primitives instead of guessing from screenshots or package docs.
          </Text>
        </div>
      </DocsSection>

      <DocsSection
        id="next"
        title="What's next?"
        description="Start with setup, then read the Text primitive. It defines the vocabulary the rest of the typography components build on."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/docs/installation">Installation</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/docs/components/text">Read Text docs</Link>
          </Button>
        </div>
      </DocsSection>
    </article>
  );
}

function CoreIdeasList() {
  return (
    <ol className="border-border divide-border overflow-hidden rounded-xl border">
      {coreIdeas.map((idea, index) => (
        <li
          key={idea.idea}
          className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:gap-5"
        >
          <Text
            as="span"
            intent="caption"
            tone="muted"
            weight="medium"
            className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full"
          >
            {String(index + 1).padStart(2, '0')}
          </Text>
          <div className="space-y-2">
            <Text intent="h4" as="h3">
              {idea.idea}
            </Text>
            <Text leading="comfortable" measure="readable" tone="muted">
              {idea.decision}
            </Text>
          </div>
        </li>
      ))}
    </ol>
  );
}

function DefaultValuesList() {
  return (
    <div className="border-border divide-border overflow-hidden rounded-xl border">
      {defaultValues.map((item) => (
        <div key={item.name} className="space-y-2 px-4 py-5">
          <Text intent="h4" as="h3">
            {item.name}
          </Text>
          <Text leading="comfortable" measure="readable" tone="muted">
            {item.detail}
          </Text>
        </div>
      ))}
    </div>
  );
}

export { OverviewPage };
