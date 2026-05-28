import '@/test/dom';

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Text } from './text';
import { TextLink } from './text-link';

afterEach(cleanup);

describe('TextLink', () => {
  it('renders a native anchor', () => {
    const { getByRole } = render(
      <TextLink href="/docs">Documentation</TextLink>,
    );

    expect(
      getByRole('link', { name: 'Documentation' }).getAttribute('href'),
    ).toBe('/docs');
  });

  it('inherits typography and uses an intentional underline by default', () => {
    const { getByRole } = render(
      <TextLink href="/docs">Documentation</TextLink>,
    );

    const link = getByRole('link', { name: 'Documentation' });

    expect(link.classList.contains('text-inherit')).toBe(true);
    expect(link.classList.contains('[font-weight:inherit]')).toBe(true);
    expect(link.classList.contains('underline')).toBe(true);
  });

  it('works inline inside Text paragraphs', () => {
    const { getByRole, getByText } = render(
      <Text>
        Read the <TextLink href="/docs">documentation</TextLink>.
      </Text>,
    );

    const paragraph = getByText((_, element) => {
      return (
        element?.tagName === 'P' &&
        element.textContent === 'Read the documentation.'
      );
    });

    expect(
      paragraph.contains(getByRole('link', { name: 'documentation' })),
    ).toBe(true);
  });

  it('adds safe defaults for external links', () => {
    const { getByRole } = render(
      <TextLink href="https://github.com" external>
        GitHub
      </TextLink>,
    );

    const link = getByRole('link', { name: 'GitHub' });

    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });

  it('preserves custom target and rel values', () => {
    const { getByRole } = render(
      <TextLink href="https://github.com" external rel="author" target="_self">
        GitHub
      </TextLink>,
    );

    const link = getByRole('link', { name: 'GitHub' });

    expect(link.getAttribute('target')).toBe('_self');
    expect(link.getAttribute('rel')).toBe('author');
  });

  it('removes unsafe opener rel values from external blank links', () => {
    const { getByRole } = render(
      <TextLink href="https://github.com" external rel="author opener">
        GitHub
      </TextLink>,
    );

    const link = getByRole('link', { name: 'GitHub' });

    expect(link.getAttribute('rel')).toBe('author noopener noreferrer');
  });
});
