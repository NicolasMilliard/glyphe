import { describe, expect, it } from 'vitest';
import { requireRegistryItem } from '@/registry';
import { escapeCssIdentifier, generateCss, getGeneratedCssNames } from './css';

describe('css generator', () => {
  it('generates stable names from registry slugs', () => {
    const item = requireRegistryItem('spinner/braille');

    expect(getGeneratedCssNames(item)).toEqual({
      rootClassName: 'glyphe-spinner-braille',
      keyframeName: 'glyphe-spinner-braille-frames',
    });
  });

  it('escapes generated identifiers', () => {
    expect(escapeCssIdentifier('Text/Glitch Soft!')).toBe('text-glitch-soft');
  });

  it('generates stacked span CSS', () => {
    expect(
      generateCss(requireRegistryItem('spinner/braille')),
    ).toMatchSnapshot();
  });

  it('generates transform CSS', () => {
    expect(
      generateCss(requireRegistryItem('text/glitch-soft')),
    ).toMatchSnapshot();
  });
});
