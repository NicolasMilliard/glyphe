import { createFileRoute } from '@tanstack/react-router';
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
    <DocsContent>
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>

      <h2>Accessibility</h2>
      <p>
        Glyphe animations should be easy to copy, but they should also be hard
        to misuse. Every registry item carries accessibility metadata so the
        gallery, generator, and generated code can recommend the right pattern.
      </p>

      <h3>Accessibility modes</h3>
      <p>
        Glyphe currently uses three modes: <code>decorative</code>,{' '}
        <code>status</code>, and <code>text-effect</code>.
      </p>
      <ul>
        <li>
          Decorative animations are visual accents. Hide the moving glyphs from
          assistive tech with <code>aria-hidden</code> and make sure nearby text
          explains any meaningful state.
        </li>
        <li>
          Status animations communicate waiting, loading, or progress. Expose a
          stable label with <code>role="status"</code> or an equivalent readable
          status, while keeping changing frames out of the accessibility tree.
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
        <code>Progress loading</code>, and a text effect should expose the final
        readable text.
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
        Text effects near reading content should be especially easy to pause or
        replace with reduced motion. Avoid high-contrast flashes, rapid
        full-screen changes, and aggressive jitter for glitch-style effects.
      </p>

      <h2>Registry first</h2>
      <p>
        Glyphe will use structured animation metadata to generate previews, CSS,
        React components, Tailwind-friendly output, and future CLI installs.
      </p>
    </DocsContent>
  );
}
