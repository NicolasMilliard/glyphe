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
        <p>{metadata.description}</p>

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
          Glyphe is a registry-first, CSS-first toolkit for terminal-inspired
          text animation on the web. It is built around copyable primitives:
          unicode spinners, ASCII loaders, progress indicators, cursor effects,
          glitch text, typewriter text, and other animated glyph systems.
        </p>
        <p>
          The product goal is ownership. Generated CSS, React components, and
          Tailwind-friendly snippets should be readable enough to paste into an
          app, rename, customize, and keep without depending on a runtime
          package.
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
        <p>
          For visual selection, start in the <Link to="/gallery">gallery</Link>.
          For custom frames, use the <Link to="/generator">generator</Link>. For
          realistic product usage, browse the{' '}
          <Link to="/examples">examples</Link>.
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

        <h2 id="installation-usage">Installation and usage</h2>
        <p>
          Glyphe is currently designed around copying code from the website.
          Pick an animation in the gallery, inspect the detail page, then copy
          the output that matches your project.
        </p>
        <ul>
          <li>
            Copy CSS when you want the smallest dependency-free primitive.
          </li>
          <li>
            Copy React when you want accessible markup and props alongside the
            CSS pattern.
          </li>
          <li>
            Copy Tailwind when your project keeps animation tokens in a Tailwind
            v4 stylesheet.
          </li>
        </ul>
        <p>
          A CLI is planned, but it should preserve the same ownership model:
          generate ordinary files, place them in your project, and keep the code
          readable after install.
        </p>

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
        <p>
          When in doubt, start with <code>stacked-spans</code> for frame-based
          glyph animation, <code>transform</code> for visual distortion, and{' '}
          <code>scripted</code> for effects that need text state over time.
        </p>

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
        <p>
          If an animation is only reinforcing nearby text, treat it as
          decorative. If the animation is the only signal that work is
          happening, expose a status label. If the animation changes readable
          words, keep the final text available even while the visual frame is
          moving.
        </p>

        <h3>Labels</h3>
        <p>
          Prefer a stable screen reader label over announcing every frame. A
          spinner can say <code>Loading</code>, a progress primitive can say{' '}
          <code>Progress loading</code>, and a text effect should expose the
          final readable text.
        </p>
        <p>
          Generated React includes label-oriented markup. Plain CSS copies still
          need surrounding HTML that gives users the same stable meaning.
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
        <p>
          Reduced motion should preserve meaning. A spinner can become one still
          glyph beside a loading label; a progress primitive can become readable
          text; a glitch effect can fall back to the final word.
        </p>

        <h3>Pause and flashing risk</h3>
        <p>
          Long-running or prominent looping animations should have a pause path.
          Text effects near reading content should be especially easy to pause
          or replace with reduced motion. Avoid high-contrast flashes, rapid
          full-screen changes, and aggressive jitter for glitch-style effects.
        </p>
        <p>
          Test the copied result with motion enabled, motion reduced, keyboard
          focus visible, and screen reader labels present in the surrounding
          interface.
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
        <h3>Braille and block glyphs</h3>
        <p>
          Braille spinners are compact and expressive, but the dot shape can
          vary by font. Keep them in a monospace stack, preserve line height,
          and check that empty dots do not appear as outlines in your target
          font.
        </p>
        <p>
          Block glyphs work well for loaders and progress, but they can feel
          heavier than ASCII. Use them when the surrounding UI can support that
          visual weight.
        </p>
        <h3>Compatibility checks</h3>
        <ul>
          <li>
            Check the animation in your app font and a monospace fallback.
          </li>
          <li>Check light and dark backgrounds.</li>
          <li>
            Check Safari, Chrome, and Firefox when Unicode alignment matters.
          </li>
          <li>Check reduced motion before shipping looping effects.</li>
        </ul>

        <h2 id="generator-output">Generator output</h2>
        <p>
          The generator turns frame lists into previewable registry-shaped
          items. It uses the same CSS, React, Tailwind, accessibility, and
          compatibility paths as gallery items, so exported code should match
          the preview.
        </p>
        <ul>
          <li>Use spaces for simple one-glyph frames like braille spinners.</li>
          <li>
            Use one frame per line when frames contain internal spaces, such as
            ASCII progress bars.
          </li>
          <li>
            Choose presets from the curated registry list when you want a safe
            starting point.
          </li>
        </ul>
        <h3>Timing and loop controls</h3>
        <p>
          Duration controls how long one full pass takes. Timing controls how
          frames advance. Use <code>steps</code> for discrete glyph swaps,{' '}
          <code>linear</code> for continuous values, and <code>custom</code>{' '}
          when you want to expose a CSS variable for local tuning.
        </p>
        <p>
          Looping should match the job. Loading states usually loop; reveal
          effects like typewriter or scramble often run once and settle on the
          final text.
        </p>
        <h3>Custom animations</h3>
        <p>
          If a generated animation becomes part of your product language, keep
          the exported code in your project and treat it like local UI code.
          Rename classes, adjust variables, and delete options you do not need.
        </p>

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
        <ul>
          <li>
            Use generated <code>@theme</code> tokens when the animation should
            be reused through Tailwind utilities.
          </li>
          <li>
            Use generated utility classes when you want a named local primitive
            such as <code>glyphe-spinner-braille</code>.
          </li>
          <li>
            Override <code>--glyphe-duration</code>, <code>--glyphe-width</code>
            , and <code>--glyphe-font-family</code> near the component when a
            single instance needs different behavior.
          </li>
        </ul>

        <h2 id="registry-metadata">Registry metadata</h2>
        <p>
          Registry items are ordinary typed objects. Each item carries a slug,
          category, tags, frames, duration, timing, loop behavior, rendering
          strategy, accessibility metadata, compatibility metadata, and
          customization options.
        </p>
        <p>
          Categories describe the broad primitive type. Tags describe discovery
          traits like <code>braille</code>, <code>ascii</code>,{' '}
          <code>blocks</code>, <code>glitch</code>, or <code>loading</code>.
          Compatibility metadata describes how risky the glyphs are across fonts
          and platforms.
        </p>
        <p>
          Future CLI installs should read from the same registry entries as the
          website, so <code>glyphe add spinner/braille</code> can stay aligned
          with the gallery preview, generated code, and accessibility notes.
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
