import { Text } from '@/components/ui';

export const quickExampleCode = `import { Text } from '@/components/ui';

export function PageIntro() {
  return (
    <header>
      <Text intent="h1" measure="narrow" wrap="balance">
        Ship typography that keeps its shape.
      </Text>

      <Text intent="lead" leading="comfortable" measure="readable" tone="muted">
        Use named typography decisions instead of repeating one-off classes.
      </Text>
    </header>
  );
}`;

export const primitives = [
  {
    name: 'Text',
    role: 'Base text',
    detail:
      'Headings, paragraphs, lead text, labels, captions, and inline code.',
  },
  {
    name: 'TextLink',
    role: 'Inline links',
    detail:
      'Underline variants, token-backed tones, focus styles, and safe external-link behavior.',
  },
  {
    name: 'TextSkeleton',
    role: 'Loading states',
    detail:
      'Text-shaped placeholders that keep reading rhythm stable while content loads.',
  },
  {
    name: 'TypewriterText',
    role: 'Text feedback',
    detail:
      'Typewriter-style motion with configurable timing, steps, tone, and cursor behavior.',
  },
  {
    name: 'TextReveal',
    role: 'Text entrance',
    detail:
      'Fade, blur, slide, and mask reveal effects with reduced-motion handling in CSS.',
  },
] as const;

export const coreIdeas = [
  {
    idea: 'Intent is not always semantics',
    decision: (
      <>
        <Text intent="code">intent</Text> selects the typography variant.{' '}
        <Text intent="code">as</Text> changes the rendered element when the
        document structure needs something else.
      </>
    ),
  },
  {
    idea: 'Tokens beat one-off classes',
    decision: (
      <>
        <Text intent="code">tone</Text>, <Text intent="code">measure</Text>,{' '}
        <Text intent="code">leading</Text>, and <Text intent="code">wrap</Text>{' '}
        name repeated typography decisions without hiding{' '}
        <Text intent="code">className</Text>.
      </>
    ),
  },
  {
    idea: 'Primitives stay narrow',
    decision:
      'Links, loading states, and text motion are separate primitives so Text can stay boring enough to use everywhere.',
  },
  {
    idea: 'Composition stays open',
    decision: (
      <>
        Components accept regular React props. Motion primitives also support{' '}
        <Text intent="code">asChild</Text> when the final DOM needs to stay in
        your control.
      </>
    ),
  },
] as const;

export const defaultValues = [
  {
    name: 'Semantic defaults',
    detail:
      'Text intents render sensible elements by default: headings render headings, paragraphs render p, labels render label, and code renders code.',
  },
  {
    name: 'Readable measures',
    detail:
      'Measure options use character-based widths so prose, lead text, and short copy have predictable line lengths.',
  },
  {
    name: 'Token-backed tones',
    detail:
      'Tone values map to the project color tokens instead of hardcoded colors.',
  },
  {
    name: 'Quiet motion',
    detail:
      'Motion primitives define timing through CSS variables and stop animation when reduced motion is requested.',
  },
] as const;
