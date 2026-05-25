import { describe, expect, it } from 'vitest';
import { progressAscii } from '@/registry/items/progress-ascii';
import { spinnerBraille } from '@/registry/items/spinner-braille';
import { textGlitch3d } from '@/registry/items/text-glitch-3d';
import { textGlitchSoft } from '@/registry/items/text-glitch-soft';
import {
  escapeCssIdentifier,
  escapeCssString,
  generateCss,
  getFrameWidth,
  getGeneratedCssNames,
} from './css';

describe('css generator', () => {
  it('generates stable names from registry slugs', () => {
    expect(getGeneratedCssNames(spinnerBraille)).toEqual({
      rootClassName: 'glyphe-spinner-braille',
      keyframeName: 'glyphe-spinner-braille-frames',
    });
  });

  it('escapes generated identifiers', () => {
    expect(escapeCssIdentifier('Text/Glitch Soft!')).toBe('text-glitch-soft');
    expect(escapeCssIdentifier('!!!')).toBe('animation');
  });

  it('sanitizes generated name overrides', () => {
    expect(
      getGeneratedCssNames(spinnerBraille, {
        className: '.Custom Spinner!',
        keyframeName: 'Custom Frames!',
      }),
    ).toEqual({
      rootClassName: 'custom-spinner',
      keyframeName: 'custom-frames',
    });
  });

  it('escapes generated CSS strings', () => {
    expect(escapeCssString('a"b\\c\nd')).toBe('a\\"b\\\\c\\A d');
  });

  it('estimates frame width by code point instead of string length', () => {
    expect(getFrameWidth('😀')).toBe(1);
    expect(getFrameWidth('ab')).toBe(2);
  });

  it('generates stacked span CSS', () => {
    expect(generateCss(spinnerBraille)).toMatchSnapshot();
  });

  it('generates transform CSS', () => {
    expect(generateCss(textGlitchSoft)).toMatchSnapshot();
  });

  it('generates chromatic 3D glitch CSS', () => {
    const output = generateCss(textGlitch3d);

    expect(output).toContain('::before');
    expect(output).toContain('::after');
    expect(output).toContain('cyan');
    expect(output).toContain('red');
  });

  it('generates status CSS', () => {
    expect(generateCss(progressAscii)).toContain(
      '@media (prefers-reduced-motion: reduce)',
    );
  });

  it('uses code point width for generated frame boxes', () => {
    const output = generateCss({
      ...spinnerBraille,
      frames: ['😀', '→'],
    });

    expect(output).toContain('width: var(--glyphe-width, 1ch);');
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

  it('escapes generated pseudo-content frames', () => {
    const output = generateCss({
      ...spinnerBraille,
      frames: ['a"b\\c\nd'],
      strategy: 'pseudo-content',
    });

    expect(output).toContain('content: "a\\"b\\\\c\\A d";');
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
