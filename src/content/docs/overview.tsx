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
    idea: 'Intent over elements',
    decision: (
      <>
        <Text intent="code">intent</Text> selects the typography style. Use{' '}
        <Text intent="code">as</Text> when the document structure calls for a
        different element.
      </>
    ),
  },
  {
    idea: 'Repeated decisions deserve names',
    decision: (
      <>
        <Text intent="code">tone</Text>, <Text intent="code">measure</Text>,{' '}
        <Text intent="code">leading</Text>, and <Text intent="code">wrap</Text>{' '}
        capture typography decisions you make every day.
      </>
    ),
  },
  {
    idea: 'Primitives stay focused',
    decision:
      'Links, motion, and loading states are separate primitives. Text stays focused on typography.',
  },
  {
    idea: 'Composition stays open',
    decision:
      'Components accept regular React props and compose naturally with the rest of your application.',
  },
] as const;

export const defaultValues = [
  {
    name: 'Semantic by default',
    detail:
      'Text primitives render sensible elements out of the box, making interfaces accessible before customization.',
  },
  {
    name: 'Consistent reading rhytm',
    detail:
      'Measures, tones, and spacing are chosen to work well together while remaining easy to adjust.',
  },
  {
    name: 'Motion when it helps',
    detail:
      'Animation primitives come with sensible timing and automatically respect reduced motion preferences.',
  },
] as const;
