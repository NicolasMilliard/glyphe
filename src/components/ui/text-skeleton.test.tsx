import '@/test/dom';

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TextSkeleton } from './text-skeleton';

afterEach(cleanup);

describe('TextSkeleton', () => {
  it('renders decorative skeleton lines by default', () => {
    const { container } = render(<TextSkeleton lines={3} />);
    const skeleton = container.querySelector('[data-slot="text-skeleton"]');
    const lines = container.querySelectorAll('.glyphe-text-skeleton');

    expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
    expect(lines).toHaveLength(3);
  });

  it('can expose an accessible loading name when needed', () => {
    const { getByRole } = render(<TextSkeleton aria-label="Loading title" />);

    expect(getByRole('status').getAttribute('aria-label')).toBe(
      'Loading title',
    );
  });

  it('lets line classes override color and animation defaults', () => {
    const { container } = render(
      <TextSkeleton lineClassName="animate-none bg-red-200" />,
    );

    const line = container.querySelector('.glyphe-text-skeleton');

    expect(line?.classList.contains('bg-red-200')).toBe(true);
    expect(line?.classList.contains('bg-muted')).toBe(false);
    expect(line?.classList.contains('animate-none')).toBe(true);
    expect(
      Array.from(line?.classList ?? []).some((className) =>
        className.startsWith('animate-[glyphe-text-skeleton'),
      ),
    ).toBe(false);
  });

  it('follows text intent and measure classes', () => {
    const { container } = render(
      <TextSkeleton intent="h2" measure="readable" />,
    );

    const skeleton = container.querySelector('[data-slot="text-skeleton"]');

    expect(skeleton?.classList.contains('text-3xl')).toBe(true);
    expect(skeleton?.classList.contains('max-w-[65ch]')).toBe(true);
  });
});
