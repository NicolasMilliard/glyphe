import '@/test/dom';

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Text } from './text';

afterEach(cleanup);

describe('Text', () => {
  it('renders a paragraph by default', () => {
    const { getByText } = render(<Text>Body copy</Text>);

    expect(getByText('Body copy').tagName).toBe('P');
  });

  it('uses the intent as the default semantic element', () => {
    const { getByRole } = render(<Text intent="h3">Section title</Text>);

    expect(getByRole('heading', { level: 3 }).textContent).toBe(
      'Section title',
    );
  });

  it('allows the rendered element to differ from the visual intent', () => {
    const { getByText } = render(
      <Text intent="h3" as="label" htmlFor="motion">
        Motion
      </Text>,
    );

    const label = getByText('Motion');

    expect(label.tagName).toBe('LABEL');
    expect(label.getAttribute('for')).toBe('motion');
    expect(label.classList.contains('text-2xl')).toBe(true);
    expect(label.classList.contains('font-semibold')).toBe(true);
  });

  it('allows visual label intent without label semantics', () => {
    const { getByText } = render(
      <Text intent="label" as="span">
        Visual label
      </Text>,
    );

    expect(getByText('Visual label').tagName).toBe('SPAN');
  });

  it('lets explicit props override intent typography', () => {
    const { getByRole } = render(
      <Text intent="h3" weight="normal">
        Quiet heading
      </Text>,
    );

    expect(
      getByRole('heading', { level: 3 }).classList.contains('font-normal'),
    ).toBe(true);
  });

  it('applies measure and leading classes', () => {
    const { getByText } = render(
      <Text measure="readable" leading="comfortable">
        Readable paragraph
      </Text>,
    );

    const text = getByText('Readable paragraph');

    expect(text.classList.contains('max-w-[65ch]')).toBe(true);
    expect(text.classList.contains('leading-8')).toBe(true);
  });

  it('preserves intent-specific font families by default', () => {
    const { getByText } = render(
      <Text intent="code">const value = true;</Text>,
    );

    const code = getByText('const value = true;');

    expect(code.tagName).toBe('CODE');
    expect(code.classList.contains('font-mono')).toBe(true);
    expect(code.classList.contains('[font-family:inherit]')).toBe(false);
  });
});
