import { describe, expect, it } from 'vitest';
import { spinnerBraille } from '@/registry/items/spinner-braille';
import { textGlitchSoft } from '@/registry/items/text-glitch-soft';
import {
  generateTailwindClassNameExample,
  generateTailwindCss,
  generateTailwindTheme,
  generateTailwindUtilityExample,
  getTailwindNames,
} from './tailwind';

describe('tailwind generator', () => {
  it('generates stable Tailwind names', () => {
    expect(getTailwindNames(spinnerBraille)).toEqual({
      utilityClassName: 'glyphe-spinner-braille',
      keyframeName: 'glyphe-spinner-braille-frames',
      animationToken: 'spinner-braille',
    });
  });

  it('generates @theme animation output', () => {
    expect(generateTailwindTheme(spinnerBraille)).toMatchSnapshot();
  });

  it('generates Tailwind-friendly CSS', () => {
    expect(generateTailwindCss(spinnerBraille)).toMatchSnapshot();
  });

  it('generates utility examples', () => {
    expect(generateTailwindUtilityExample(spinnerBraille)).toBe(
      '.glyphe-spinner-braille',
    );
  });

  it('generates className examples', () => {
    expect(generateTailwindClassNameExample(textGlitchSoft)).toBe(
      'className="glyphe-text-glitch-soft animate-text-glitch-soft"',
    );
  });

  it('reflects timing and loop options in @theme output', () => {
    expect(
      generateTailwindTheme({
        ...spinnerBraille,
        timing: 'ease',
        loop: false,
      }),
    ).toContain('ease 1 forwards');
  });
});
