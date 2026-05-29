import '@/test/dom';

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Text } from './text';
import { TextReveal } from './text-reveal';

afterEach(cleanup);

describe('TextReveal', () => {
  it('uses a mask reveal by default', () => {
    const { getByText } = render(<TextReveal>Reveal me</TextReveal>);

    const text = getByText('Reveal me');

    expect(text.classList.contains('glyphe-text-reveal')).toBe(true);
    expect(text.classList.contains('glyphe-text-reveal-mask')).toBe(true);
  });

  it('sets timing variables', () => {
    const { getByText } = render(
      <TextReveal delay="80ms" duration="600ms">
        Reveal me
      </TextReveal>,
    );

    const text = getByText('Reveal me');

    expect(text.style.getPropertyValue('--glyphe-text-reveal-delay')).toBe(
      '80ms',
    );
    expect(text.style.getPropertyValue('--glyphe-text-reveal-duration')).toBe(
      '600ms',
    );
  });

  it('can apply the effect to an existing text component', () => {
    const { getByRole } = render(
      <TextReveal asChild effect="blur">
        <Text intent="h1">Glyphe</Text>
      </TextReveal>,
    );

    const heading = getByRole('heading', { level: 1 });

    expect(heading.classList.contains('glyphe-text-reveal')).toBe(true);
    expect(heading.classList.contains('glyphe-text-reveal-blur')).toBe(true);
    expect(heading.getAttribute('data-slot')).toBe('text-reveal');
  });

  it('preserves child classes and applies reveal timing when composed', () => {
    const { getByRole } = render(
      <TextReveal asChild delay="4000ms">
        <Text intent="display" className="glyphe-reveal mb-4 font-serif">
          Glyphe
        </Text>
      </TextReveal>,
    );

    const heading = getByRole('heading', { level: 1 });

    expect(heading.classList.contains('glyphe-text-reveal')).toBe(true);
    expect(heading.classList.contains('glyphe-text-reveal-mask')).toBe(true);
    expect(heading.classList.contains('glyphe-reveal')).toBe(true);
    expect(heading.classList.contains('font-serif')).toBe(true);
    expect(heading.style.getPropertyValue('--glyphe-text-reveal-delay')).toBe(
      '4000ms',
    );
  });
});
