import { describe, expect, it } from 'vitest';

import { TextLink } from './text-link';

describe('TextLink types', () => {
  it('requires href', () => {
    <TextLink href="/docs">Documentation</TextLink>;

    // @ts-expect-error TextLink renders a native anchor, so href is required.
    <TextLink>Missing href</TextLink>;

    expect(true).toBe(true);
  });
});
