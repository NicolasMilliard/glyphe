import { describe, expect, it } from 'vitest';
import { progressAscii } from '@/registry/items/progress-ascii';
import { spinnerBraille } from '@/registry/items/spinner-braille';
import { textGlitchSoft } from '@/registry/items/text-glitch-soft';
import { escapeCssIdentifier, generateCss, getGeneratedCssNames } from './css';

describe('css generator', () => {
  it('generates stable names from registry slugs', () => {
    expect(getGeneratedCssNames(spinnerBraille)).toEqual({
      rootClassName: 'glyphe-spinner-braille',
      keyframeName: 'glyphe-spinner-braille-frames',
    });
  });

  it('escapes generated identifiers', () => {
    expect(escapeCssIdentifier('Text/Glitch Soft!')).toBe('text-glitch-soft');
  });

  it('generates stacked span CSS', () => {
    expect(generateCss(spinnerBraille)).toMatchSnapshot();
  });

  it('generates transform CSS', () => {
    expect(generateCss(textGlitchSoft)).toMatchSnapshot();
  });

  it('generates status CSS', () => {
    expect(generateCss(progressAscii)).toContain(
      '@media (prefers-reduced-motion: reduce)',
    );
  });

  it('generates CSS variable swap CSS', () => {
    expect(
      generateCss({
        ...spinnerBraille,
        strategy: 'css-var-swap',
      }),
    ).toContain('--glyphe-frame');
  });

  it('generates pseudo-element CSS', () => {
    expect(
      generateCss({
        ...spinnerBraille,
        strategy: 'pseudo-content',
      }),
    ).toContain('::before');
  });

  it('reflects timing and loop options in CSS', () => {
    expect(
      generateCss({
        ...spinnerBraille,
        timing: 'linear',
        loop: false,
      }),
    ).toContain('linear 1 forwards');
  });
});
