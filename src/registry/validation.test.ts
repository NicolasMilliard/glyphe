import { describe, expect, it } from 'vitest';
import { getRegistryItem, registryItems } from './index';
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

  it('registers braille spinner variants', () => {
    const brailleItems = registryItems.filter((item) =>
      item.slug.startsWith('spinner/braille'),
    );

    expect(brailleItems).toHaveLength(24);
    expect(getRegistryItem('spinner/braille-orbit')?.frames).toEqual([
      '⠁',
      '⠂',
      '⠄',
      '⡀',
      '⠠',
      '⠐',
      '⠈',
      '⠁',
    ]);
    expect(getRegistryItem('spinner/braille-ripple')?.frames).toContain('⠿');
  });
});
