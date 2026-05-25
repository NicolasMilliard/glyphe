import { Link, createFileRoute } from '@tanstack/react-router';
import { DocsContent } from '@/components/site/docs-content';
import { routeMetadata } from '@/lib/routes';
import { useDocumentTitle } from '@/lib/use-document-title';

export const Route = createFileRoute('/docs')({
  component: DocsPage,
});

function DocsPage() {
  const metadata = routeMetadata.docs;
  useDocumentTitle(metadata.title);

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start">
      <aside className="lg:sticky lg:top-24">
        <nav aria-label="Docs sections" className="grid gap-6">
          {docsNavGroups.map((group) => (
            <div key={group.label} className="grid gap-2">
              <p className="text-muted-foreground font-mono text-xs uppercase">
                {group.label}
              </p>
              <div className="grid gap-1">
                {group.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="glyphe-pressable text-muted-foreground hover:bg-surface hover:text-foreground rounded-glyphe-md px-3 py-2 text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <DocsContent>
        <h1>{metadata.title}</h1>
        <p>
          Glyphe is a small bet: terminal-inspired animation belongs in the
          browser, but it should still feel like code you can hold in your hand.
        </p>

        <div className="border-border rounded-glyphe-lg my-8 grid gap-0 overflow-hidden border">
          {quickLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="glyphe-pressable border-border hover:bg-surface grid gap-1 border-b px-4 py-3 last:border-b-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4"
            >
              <span className="text-foreground text-sm font-medium">
                {item.label}
              </span>
              <span className="text-muted-foreground text-sm leading-6">
                {item.description}
              </span>
            </Link>
          ))}
        </div>

        <h2 id="project-introduction">Project introduction</h2>
        <p>
          Most loading animations on the web are either too heavy or too cute.
          Glyphe sits in the smaller space between them: unicode spinners, ASCII
          loaders, progress bars, cursors, typing effects, glitches, and matrix
          text that can live inside real product interfaces.
        </p>
        <p>
          The output is intentionally boring. CSS you can read. React you can
          delete. Tailwind snippets that do not turn Tailwind into a hard
          dependency. The website helps you choose; the copied code belongs to
          you.
        </p>

        <h2 id="registry-concepts">Registry concepts</h2>
        <p>
          The registry is where an animation becomes a product primitive instead
          of a random snippet. A registry item knows its frames, duration,
          timing, loop behavior, rendering strategy, accessibility mode, unicode
          risk, and customization surface.
        </p>
        <p>
          That matters because previews lie when they are hand-built. Glyphe
          keeps the gallery, detail pages, generator, compatibility notes, and
          future CLI pointed at the same data. One source of truth, fewer quiet
          inconsistencies.
        </p>
        <pre>
          <code>{`{
  slug: 'spinner/braille',
  strategy: 'stacked-spans',
  duration: 900,
  accessibility: { mode: 'status' },
  compatibility: { unicodeRisk: 'low' }
}`}</code>
        </pre>
        <p>
          Start with the <Link to="/gallery">gallery</Link> when you want to
          choose visually. Use the <Link to="/generator">generator</Link> when
          you already have frames. Open the <Link to="/registry">registry</Link>{' '}
          when you want to inspect the metadata directly.
        </p>

        <h2 id="copy-paste-ownership">Copy-paste ownership</h2>
        <p>
          Glyphe treats distribution as a handoff: the useful part should not
          hide behind a permanent dependency. Copy the primitive, place it in
          your project, and change it when your interface asks for something
          more specific.
        </p>
        <p>
          This is especially important for animation. Motion is taste. A package
          can give you a default, but your product should decide the rhythm,
          spacing, label, and failure mode.
        </p>
        <pre>
          <code>{`.glyphe-spinner {
  --glyphe-duration: 900ms;
  font-family: ui-monospace, monospace;
}`}</code>
        </pre>

        <h2 id="installation-usage">Installation and usage</h2>
        <p>
          Today, the install flow is the website. Pick an animation, inspect the
          detail page, and copy the output that matches how your app is built.
        </p>
        <p>
          Copy CSS for the smallest primitive. Copy React when you want the
          markup and accessibility wiring with it. Copy Tailwind when your team
          keeps motion tokens in a Tailwind v4 stylesheet.
        </p>
        <p>
          The future CLI should not change the philosophy. It should write files
          into your project, not make Glyphe a runtime you need to think about
          every time a button spins.
        </p>

        <h2 id="rendering-strategies">Rendering strategies</h2>
        <p>
          There is no universal renderer for text animation. A braille spinner,
          a glitch word, and a typewriter effect have different failure modes.
          Glyphe keeps those choices explicit.
        </p>
        <p>
          Use <code>stacked-spans</code> when frames are real glyphs and unicode
          rendering matters. Use <code>transform</code> when the text stays the
          same but the surface moves. Use <code>scripted</code> when the
          animation has state, like scramble or typewriter text.
        </p>
        <p>
          <code>pseudo-content</code> and <code>css-var-swap</code> are compact,
          but they are not magic. Generated content needs careful labels because
          the DOM is no longer telling the whole story.
        </p>

        <h2 id="accessibility">Accessibility</h2>
        <p>
          Animation should not talk too much. A spinner that announces every
          frame is broken, even if it looks beautiful.
        </p>
        <p>
          Glyphe classifies animations as <code>decorative</code>,{' '}
          <code>status</code>, or <code>text-effect</code>. Decorative motion is
          hidden from assistive tech. Status motion exposes one stable label.
          Text effects keep the final readable text available.
        </p>
        <pre>
          <code>{`<span role="status" aria-label="Loading">
  <span aria-hidden="true">⠋</span>
</span>`}</code>
        </pre>
        <p>
          Reduced motion is part of the primitive, not a patch at the end. If
          someone asks for less motion, preserve meaning first. A loading state
          can become a static glyph beside a label. A glitch can become the
          final word. A progress animation can become text.
        </p>
        <p>
          Long-running loops need a pause path when they sit near reading
          content. Glitch effects should be restrained by default. A little
          distortion has taste; aggressive flashing just makes the interface
          worse.
        </p>
        <p>
          Test motion enabled, motion reduced, keyboard focus, and screen reader
          labels. Not because the checklist is interesting, but because copied
          animation travels into contexts you did not design.
        </p>

        <h2 id="unicode-rendering">Unicode rendering</h2>
        <p>
          Unicode is expressive because it is not neutral. The same glyph can
          look slightly different across fonts, operating systems, and browsers.
          Braille dots are the clearest example: compact, elegant, and still
          dependent on the font stack.
        </p>
        <p>
          The rule is simple: if frames need to align, use a monospace stack and
          give the preview a fixed box. Do not let glyph width resize the UI. Do
          not assume emoji are text. Do not assume combining characters will
          behave like ordinary letters.
        </p>
        <pre>
          <code>{`.glyphe-frame {
  display: inline-grid;
  place-items: center;
  width: 1ch;
  line-height: 1;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}`}</code>
        </pre>
        <p>
          Check light and dark backgrounds. Check Safari when alignment matters.
          Check your actual product font. The gallery is a good preview, not a
          substitute for your interface.
        </p>

        <h2 id="generator-output">Generator output</h2>
        <p>
          The generator is for turning a sketch into code. Paste frames, choose
          timing, decide how it should render, then export CSS, React, or
          Tailwind.
        </p>
        <p>
          Use spaces for simple one-glyph frames. Use one frame per line when a
          frame contains spaces, like ASCII progress bars. That tiny distinction
          avoids most broken previews.
        </p>
        <pre>
          <code>{`⠋ ⠙ ⠹ ⠸ ⠼

[    ]
[=   ]
[==  ]
[=== ]`}</code>
        </pre>
        <p>
          Loading states usually loop. Reveal effects usually finish. If your
          generated animation becomes part of the product language, promote it
          into local UI code and remove the options you do not need.
        </p>

        <h2 id="tailwind-integration">Tailwind integration</h2>
        <p>
          Tailwind support is additive. Glyphe starts with ordinary CSS and then
          gives Tailwind projects a way to keep the same primitive inside the
          stylesheet where motion tokens already live.
        </p>
        <p>
          The output should stay close to the CSS version. If the Tailwind
          version feels like a second implementation, it is doing too much.
        </p>
        <pre>
          <code>{`@theme {
  --animate-glyphe-spinner: glyphe-spinner 900ms steps(5) infinite;
}

.glyphe-spinner {
  animation: var(--animate-glyphe-spinner);
}`}</code>
        </pre>
        <p>
          Override variables near the component when a single instance needs a
          different pace. Put reusable timing in <code>@theme</code>. Keep taste
          local until it proves it should be global.
        </p>

        <h2 id="registry-metadata">Registry metadata</h2>
        <p>
          Registry metadata is intentionally plain. Slugs give animations stable
          names. Categories keep navigation understandable. Tags help discovery.
          Compatibility fields make rendering risk visible before someone copies
          the code.
        </p>
        <p>
          A registry item should describe enough to generate code and docs, but
          not so much that editing it feels ceremonial. The registry is a
          contract, not a database cosplay.
        </p>
        <p>
          Future CLI installs should read from the same registry entries as the
          website, so <code>glyphe add spinner/braille</code> can stay aligned
          with the gallery preview, generated code, and accessibility notes.
        </p>

        <h2 id="future-cli">Future CLI</h2>
        <p>
          The CLI should come after the registry and generators are boringly
          stable. The target flow is direct:
        </p>
        <pre>
          <code>{`bunx glyphe add spinner/braille
bunx glyphe add loader/waveform --react
bunx glyphe generate --frames "⠋ ⠙ ⠹ ⠸ ⠼"`}</code>
        </pre>
        <p>
          It should detect React, Tailwind, TypeScript, and local paths. It
          should support dry runs. Most importantly, it should preserve user
          edits. A code generator that overwrites taste is not a good tool.
        </p>
      </DocsContent>
    </div>
  );
}

const docsNavItems = [
  { label: 'Introduction', href: '#project-introduction' },
  { label: 'Registry', href: '#registry-concepts' },
  { label: 'Ownership', href: '#copy-paste-ownership' },
  { label: 'Usage', href: '#installation-usage' },
  { label: 'Rendering', href: '#rendering-strategies' },
  { label: 'Accessibility', href: '#accessibility' },
  { label: 'Unicode', href: '#unicode-rendering' },
  { label: 'Generator', href: '#generator-output' },
  { label: 'Tailwind', href: '#tailwind-integration' },
  { label: 'Metadata', href: '#registry-metadata' },
  { label: 'Future CLI', href: '#future-cli' },
];

const docsNavGroups = [
  {
    label: 'Start',
    items: docsNavItems.slice(0, 4),
  },
  {
    label: 'Use Safely',
    items: docsNavItems.slice(4, 8),
  },
  {
    label: 'Extend',
    items: docsNavItems.slice(8),
  },
];

const quickLinks = [
  {
    label: 'Browse',
    description: 'Compare previews, copy code, and inspect animation details.',
    to: '/gallery',
  },
  {
    label: 'Generate',
    description: 'Create frame animations and export CSS, React, or Tailwind.',
    to: '/generator',
  },
  {
    label: 'Apply',
    description: 'See how primitives fit inside realistic interface flows.',
    to: '/examples',
  },
] as const;
