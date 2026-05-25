import { describe, expect, it } from 'vitest';
import { progressAscii } from '@/registry/items/progress-ascii';
import { spinnerBraille } from '@/registry/items/spinner-braille';
import {
  formatJsxString,
  generateAccessibleLabelMarkup,
  generateReactComponent,
  generateReducedMotionNote,
  getComponentName,
} from './react';

describe('react generator', () => {
  it('generates stable component names', () => {
    expect(getComponentName(spinnerBraille)).toBe('SpinnerBrailleAnimation');
  });

  it('generates decorative accessible label markup', () => {
    expect(generateAccessibleLabelMarkup(spinnerBraille)).toMatchInlineSnapshot(
      `"{decorative ? null : <span className="sr-only" role="status">{label}</span>}"`,
    );
  });

  it('generates reduced motion notes', () => {
    expect(generateReducedMotionNote(progressAscii)).toMatchInlineSnapshot(
      `"// Reduced motion: Prefer a readable static label when reduced motion is requested. Keep the generated CSS media query with this component."`,
    );
  });

  it('sanitizes generated class name overrides', () => {
    expect(
      generateReactComponent(spinnerBraille, {
        className: '.Custom Spinner!',
      }),
    ).toContain("'custom-spinner'");
  });

  it('formats generated JSX string literals', () => {
    expect(formatJsxString("a'b\\c\n{d}")).toBe("'a\\'b\\\\c\\n{d}'");
  });

  it('generates stacked span components', () => {
    expect(generateReactComponent(spinnerBraille)).toMatchSnapshot();
  });

  it('generates pseudo-element components without frame spans', () => {
    expect(
      generateReactComponent({
        ...spinnerBraille,
        strategy: 'pseudo-content',
      }),
    ).not.toContain('<span>⠋</span>');
  });

  it('generates transform components with the first frame as content', () => {
    const output = generateReactComponent({
      ...spinnerBraille,
      strategy: 'transform',
    });

    expect(output).toContain('⠋');
    expect(output).not.toContain('Generated Animation');
  });

  it('generates safe JSX for frames with reserved JSX characters', () => {
    const output = generateReactComponent({
      ...spinnerBraille,
      frames: ["a'b\\c\n{d}"],
    });

    expect(output).toContain("<span>{'a\\'b\\\\c\\n{d}'}</span>");
  });

  it('generates status components', () => {
    expect(generateReactComponent(progressAscii)).toMatchSnapshot();
  });

  it('generates status labels without forcing announcements when decorative', () => {
    const output = generateReactComponent(progressAscii);

    expect(output).toContain(
      '{decorative ? null : <span className="sr-only" role="status">{label}</span>}',
    );
    expect(output).toContain('aria-hidden={decorative ? true : undefined}');
    expect(output).not.toContain('aria-label={label}');
  });

  it('hides recommended moving frames from assistive tech', () => {
    expect(generateReactComponent(spinnerBraille)).toContain(
      'aria-hidden={true}',
    );
  });
});
