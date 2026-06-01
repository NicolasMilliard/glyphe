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
import { Button, Text } from '@/components/ui';
import { MoveRightIcon } from 'lucide-react';

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
        description="Glyphe exposes the typography decisions you repeat most often and leaves the rest close to React and CSS."
      >
        <CoreIdeasList />
      </DocsSection>

      <DocsSection
        id="defaults"
        title="Defaults"
        description="Defaults should help you start quickly without getting in the way later."
      >
        <DefaultValuesList />
      </DocsSection>

      <DocsSection
        id="example"
        title="Example"
        description="Start with a typography primitive. Reach for utility classes only when the local design needs something specific."
      >
        <DocsCodeBlock
          code={quickExampleCode.trim()}
          language="tsx"
          showLanguage={false}
          theme={{
            light: 'one-light',
            dark: 'one-dark-pro',
          }}
          defaultColor="light-dark()"
        />
      </DocsSection>

      <DocsSection id="ai-ready" title="AI-Ready">
        <Text leading="comfortable" measure="readable">
          The code lives in your project, not behind a runtime API. AI tools can
          inspect the implementation directly and work with your typography
          primitives as first-class code.
        </Text>
      </DocsSection>

      <div className="flex justify-end">
        <Button asChild>
          <Link to="/docs/installation">
            Installation <MoveRightIcon />
          </Link>
        </Button>
      </div>
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
