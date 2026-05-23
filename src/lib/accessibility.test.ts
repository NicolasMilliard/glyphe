import { describe, expect, it } from 'vitest';
import { progressAscii } from '@/registry/items/progress-ascii';
import { spinnerBraille } from '@/registry/items/spinner-braille';
import { textScramble } from '@/registry/items/text-scramble';
import {
  getAccessibilityGuidance,
  getAccessibilityMode,
  getScreenReaderLabel,
} from './accessibility';

describe('accessibility helpers', () => {
  it('identifies decorative animations', () => {
    expect(getAccessibilityMode(spinnerBraille)).toBe('decorative');
  });

  it('identifies status animations', () => {
    expect(getAccessibilityMode(progressAscii)).toBe('status');
  });

  it('identifies text effects', () => {
    expect(getAccessibilityMode(textScramble)).toBe('text-effect');
  });

  it('returns stable screen reader labels', () => {
    expect(getScreenReaderLabel(progressAscii)).toBe('Progress loading');
  });

  it('builds guidance for detail pages', () => {
    expect(getAccessibilityGuidance(textScramble)).toMatchObject({
      mode: 'text-effect',
      label: 'Scramble Text',
    });
  });
});
