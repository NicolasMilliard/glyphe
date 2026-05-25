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

  it('sanitizes Tailwind name overrides', () => {
    expect(
      getTailwindNames(spinnerBraille, {
        utilityName: '.Custom Spinner!',
        animationName: 'Custom Frames!',
      }),
    ).toEqual({
      utilityClassName: 'custom-spinner',
      keyframeName: 'custom-frames',
      animationToken: 'custom-spinner',
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
      'className="glyphe-text-glitch-soft"',
    );
  });

  it('generates className examples from sanitized utility names', () => {
    expect(
      generateTailwindClassNameExample(spinnerBraille, {
        utilityName: '.Custom Spinner!',
      }),
    ).toBe('className="custom-spinner"');
  });

  it('uses the Tailwind animation token in the generated utility', () => {
    expect(generateTailwindCss(spinnerBraille)).toContain(
      'animation: var(--animate-spinner-braille);',
    );
  });

  it('keeps Tailwind output pasteable into user-owned CSS files', () => {
    const output = generateTailwindCss(spinnerBraille);

    expect(output).toContain('@theme');
    expect(output).toContain('.glyphe-spinner-braille');
    expect(output).toContain('@media (prefers-reduced-motion: reduce)');
    expect(output).not.toContain('import ');
    expect(output).not.toContain('@plugin');
  });

  it('preserves CSS variable swap keyframes in Tailwind output', () => {
    const output = generateTailwindCss({
      ...spinnerBraille,
      strategy: 'css-var-swap',
    });

    expect(output).toContain('--glyphe-frame');
    expect(output).not.toContain('0% {\n    opacity: 1;');
  });

  it('preserves pseudo-content keyframes in Tailwind output', () => {
    const output = generateTailwindCss({
      ...spinnerBraille,
      strategy: 'pseudo-content',
    });

    expect(output).toContain('content: "⠋";');
    expect(output).toContain('animation: var(--animate-spinner-braille);');
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
