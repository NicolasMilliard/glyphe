import '@/test/dom';

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Text } from './text';
import { TypewriterText } from './typewriter-text';

afterEach(cleanup);

describe('TypewriterText', () => {
  it('renders a span by default', () => {
    const { getByText } = render(<TypewriterText>Hello</TypewriterText>);

    const text = getByText('Hello');

    expect(text.tagName).toBe('SPAN');
    expect(text.classList.contains('glyphe-typewriter')).toBe(true);
  });

  it('sets timing variables', () => {
    const { getByText } = render(
      <TypewriterText delay="120ms" duration="900ms" steps={12}>
        Hello
      </TypewriterText>,
    );

    const text = getByText('Hello');

    expect(text.style.getPropertyValue('--glyphe-typewriter-delay')).toBe(
      '120ms',
    );
    expect(text.style.getPropertyValue('--glyphe-typewriter-duration')).toBe(
      '900ms',
    );
    expect(text.style.getPropertyValue('--glyphe-typewriter-steps')).toBe('12');
  });

  it('can apply the effect to an existing text component', () => {
    const { getByRole } = render(
      <TypewriterText asChild>
        <Text intent="h2">Generating</Text>
      </TypewriterText>,
    );

    const heading = getByRole('heading', { level: 2 });

    expect(heading.classList.contains('glyphe-typewriter')).toBe(true);
    expect(heading.getAttribute('data-slot')).toBe('typewriter-text');
  });

  it('preserves child typography when composed with Text', () => {
    const { getByText } = render(
      <TypewriterText asChild>
        <Text intent="paragraph" tone="muted" weight="medium">
          Open Source. No Black Boxes.
        </Text>
      </TypewriterText>,
    );

    const text = getByText('Open Source. No Black Boxes.');

    expect(text.classList.contains('text-muted-foreground')).toBe(true);
    expect(text.classList.contains('font-medium')).toBe(true);
    expect(text.classList.contains('text-inherit')).toBe(false);
    expect(text.classList.contains('inline-block')).toBe(false);
    expect(text.classList.contains('whitespace-nowrap')).toBe(false);
  });
});
