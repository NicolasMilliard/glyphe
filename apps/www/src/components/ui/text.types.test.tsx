import { describe, expect, it } from 'vitest';

import { Text } from './text';

describe('Text types', () => {
  it('requires htmlFor when label intent renders a label', () => {
    <Text intent="label" htmlFor="name">
      Name
    </Text>;

    <Text intent="label" as="span">
      Visual label
    </Text>;

    // @ts-expect-error label intent renders a label by default, so htmlFor is required.
    <Text intent="label">Missing htmlFor</Text>;

    // @ts-expect-error explicitly rendering a label still requires htmlFor.
    <Text intent="label" as="label">
      Missing htmlFor
    </Text>;

    expect(true).toBe(true);
  });
});
