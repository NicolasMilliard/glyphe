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
    <div className="grid min-w-0 gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start">
      <aside className="lg:sticky lg:top-24">
        <nav aria-label="Docs sections" className="grid gap-2">
          <p className="text-muted-foreground font-mono text-xs uppercase">
            Docs
          </p>
          {docsNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:bg-surface hover:text-foreground rounded-glyphe-md px-3 py-2 text-sm transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <DocsContent>
        <h1>{metadata.title}</h1>
        <p>{metadata.description}</p>

        <h2 id="project-introduction">Project introduction</h2>
        <p>
          Glyphe is a registry-first, CSS-first toolkit for terminal-inspired
          text animation on the web. It is built around copyable primitives:
          unicode spinners, ASCII loaders, progress indicators, cursor effects,
          glitch text, typewriter text, and other animated glyph systems.
        </p>
        <p>
          The product goal is ownership. Generated CSS, React components, and
          Tailwind-friendly snippets should be readable enough to paste into an
          app, customize, and keep without depending on a runtime package.
        </p>

        <h2 id="registry-concepts">Registry concepts</h2>
        <p>
          The registry is the source of truth for every animation. A registry
          item describes the frames, duration, timing, loop behavior, rendering
          strategy, accessibility mode, unicode compatibility, and customization
          options for a primitive.
        </p>
        <p>
          The gallery, detail pages, generator output, compatibility notes, and
          future CLI should all consume this metadata. That keeps docs,
          previews, and generated code from drifting apart.
        </p>
        <p>
          For a technical view of the current entries and active rendering
          strategies, open the <Link to="/registry">registry overview</Link>.
        </p>

        <h2 id="copy-paste-ownership">Copy-paste ownership</h2>
        <p>
          Glyphe follows the shadcn/ui style of distribution: users should own
          the generated code. The website provides good defaults and clear
          warnings, but the copied output should remain ordinary CSS and
          TypeScript.
        </p>
        <ul>
          <li>Generated CSS should use readable class names and variables.</li>
          <li>
            Generated React should be a small adapter around the CSS pattern.
          </li>
          <li>
            Generated Tailwind output should be pasteable into a Tailwind v4
            stylesheet without making Tailwind mandatory for the core project.
          </li>
        </ul>

        <h2 id="rendering-strategies">Rendering strategies</h2>
        <p>
          Glyphe supports several rendering strategies because terminal-inspired
          animation is not one single technical problem.
        </p>
        <ul>
          <li>
            <code>stacked-spans</code>: renders real text frames in stacked
            spans. This is the safest default for unicode frame animations.
          </li>
          <li>
            <code>css-var-swap</code>: swaps a CSS custom property used by
            generated content. This is compact and useful for utility output.
          </li>
          <li>
            <code>pseudo-content</code>: animates <code>::before</code> content.
            This keeps markup small, but needs clear accessibility handling.
          </li>
          <li>
            <code>transform</code>: moves or fades visible text. This works well
            for glitch, cursor, bars, and subtle motion effects.
          </li>
          <li>
            <code>scripted</code>: uses runtime frame stepping for effects like
            typewriter and scramble text.
          </li>
        </ul>

        <h2 id="accessibility">Accessibility</h2>
        <p>
          Glyphe animations should be easy to copy, but they should also be hard
          to misuse. Every registry item carries accessibility metadata so the
          gallery, generator, and generated code can recommend the right
          pattern.
        </p>

        <h3>Accessibility modes</h3>
        <p>
          Glyphe currently uses three modes: <code>decorative</code>,{' '}
          <code>status</code>, and <code>text-effect</code>.
        </p>
        <ul>
          <li>
            Decorative animations are visual accents. Hide the moving glyphs
            from assistive tech with <code>aria-hidden</code> and make sure
            nearby text explains any meaningful state.
          </li>
          <li>
            Status animations communicate waiting, loading, or progress. Expose
            a stable label with <code>role="status"</code> or an equivalent
            readable status, while keeping changing frames out of the
            accessibility tree.
          </li>
          <li>
            Text effects animate readable content. Keep the final text available
            to assistive tech and treat scrambled, glitch, or typing frames as
            visual-only decoration.
          </li>
        </ul>

        <h3>Labels</h3>
        <p>
          Prefer a stable screen reader label over announcing every frame. A
          spinner can say <code>Loading</code>, a progress primitive can say{' '}
          <code>Progress loading</code>, and a text effect should expose the
          final readable text.
        </p>

        <h3>Reduced motion</h3>
        <p>
          Generated CSS includes a <code>prefers-reduced-motion</code> media
          query. Registry items choose one of four reduced motion strategies:
        </p>
        <ul>
          <li>
            <code>first-frame</code>: show a single static frame.
          </li>
          <li>
            <code>static-label</code>: prefer a readable non-animated label.
          </li>
          <li>
            <code>disabled</code>: remove the animation entirely.
          </li>
          <li>
            <code>slowed</code>: keep motion but make it calmer.
          </li>
        </ul>

        <h3>Pause and flashing risk</h3>
        <p>
          Long-running or prominent looping animations should have a pause path.
          Text effects near reading content should be especially easy to pause
          or replace with reduced motion. Avoid high-contrast flashes, rapid
          full-screen changes, and aggressive jitter for glitch-style effects.
        </p>

        <h2 id="unicode-rendering">Unicode rendering</h2>
        <p>
          Unicode and terminal glyphs are visually expressive, but they are not
          perfectly stable across fonts, operating systems, and browsers. Glyphe
          tracks glyph width, unicode risk, emoji risk, monospace requirements,
          and recommended font stacks so users can inspect risky animations
          before copying them.
        </p>
        <ul>
          <li>
            Prefer monospace font stacks for frame animations that must align.
          </li>
          <li>
            Treat emoji as risky because they can render as colored,
            double-width, or platform-specific glyphs.
          </li>
          <li>
            Watch combining characters because they can affect width and
            vertical alignment.
          </li>
          <li>
            Use fixed preview dimensions so glyph changes do not resize the UI.
          </li>
        </ul>

        <h2 id="tailwind-integration">Tailwind integration</h2>
        <p>
          Tailwind support is additive. Glyphe generates ordinary CSS first,
          then offers Tailwind-friendly output for projects that want to keep
          animation tokens and utilities inside their stylesheet.
        </p>
        <p>
          The generated Tailwind output uses <code>@theme</code> animation
          tokens and utility classes where useful. It should stay readable,
          copyable, and close to the plain CSS output.
        </p>

        <h2 id="future-cli">Future CLI</h2>
        <p>
          A CLI should come after the registry and generators are stable. The
          future flow should feel like <code>glyphe add spinner/braille</code>:
          select a registry item, generate code, write it into user-owned files,
          and avoid hiding behavior in a runtime dependency.
        </p>
        <p>
          The CLI should eventually detect React, Tailwind, TypeScript, and
          local project paths. It should preserve user edits, support dry runs,
          and use the same registry metadata as the website.
        </p>
      </DocsContent>
    </div>
  );
}

const docsNavItems = [
  { label: 'Introduction', href: '#project-introduction' },
  { label: 'Registry', href: '#registry-concepts' },
  { label: 'Ownership', href: '#copy-paste-ownership' },
  { label: 'Rendering', href: '#rendering-strategies' },
  { label: 'Accessibility', href: '#accessibility' },
  { label: 'Unicode', href: '#unicode-rendering' },
  { label: 'Tailwind', href: '#tailwind-integration' },
  { label: 'Future CLI', href: '#future-cli' },
];
