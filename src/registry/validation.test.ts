import { describe, expect, it } from 'vitest';
import { spinnerBraille } from './items/spinner-braille';
import {
  assertUniqueSlugs,
  validateRegistry,
  validateRegistryItem,
} from './validation';

describe('registry validation', () => {
  it('validates registry items', () => {
    expect(validateRegistryItem(spinnerBraille)).toEqual(spinnerBraille);
  });

  it('rejects invalid registry items', () => {
    expect(() =>
      validateRegistryItem({
        ...spinnerBraille,
        duration: 0,
      }),
    ).toThrow();
  });

  it('validates a registry list', () => {
    expect(validateRegistry([spinnerBraille])).toEqual([spinnerBraille]);
  });

  it('rejects duplicate slugs', () => {
    expect(() => assertUniqueSlugs([spinnerBraille, spinnerBraille])).toThrow(
      'Duplicate registry slug: spinner/braille',
    );
  });
});
