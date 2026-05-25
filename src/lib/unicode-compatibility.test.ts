import { describe, expect, it } from 'vitest';
import { progressAscii } from '@/registry/items/progress-ascii';
import { spinnerBraille } from '@/registry/items/spinner-braille';
import {
  getUnicodeCompatibilityGuidance,
  getPreviewFontFamily,
  hasCombiningCharacter,
  hasEmojiGlyph,
  hasNonAsciiCharacter,
} from './unicode-compatibility';

describe('unicode compatibility helpers', () => {
  it('detects unicode glyph risks', () => {
    expect(hasNonAsciiCharacter('⠋')).toBe(true);
    expect(hasEmojiGlyph('✨')).toBe(true);
    expect(hasCombiningCharacter('e\u0301')).toBe(true);
  });

  it('infers low-risk ASCII progress compatibility', () => {
    expect(getUnicodeCompatibilityGuidance(progressAscii)).toMatchObject({
      glyphWidth: 'multi',
      unicodeRisk: 'low',
      emojiRisk: 'none',
      recommendedFontStack: 'monospace',
    });
  });

  it('infers medium-risk unicode spinner compatibility', () => {
    expect(getUnicodeCompatibilityGuidance(spinnerBraille)).toMatchObject({
      glyphWidth: 'single',
      unicodeRisk: 'medium',
      emojiRisk: 'none',
      recommendedFontStack: 'monospace',
    });
  });

  it('warns about emoji and combining characters', () => {
    const guidance = getUnicodeCompatibilityGuidance({
      ...spinnerBraille,
      frames: ['✨', 'e\u0301'],
      compatibility: {
        requiresMonospace: true,
        unicodeSensitive: true,
        supportsCssOnly: true,
      },
    });

    expect(guidance.glyphWidth).toBe('variable');
    expect(guidance.emojiRisk).toBe('high');
    expect(guidance.warnings).toEqual(
      expect.arrayContaining([
        'Emoji can render as double-width, colored, or platform-specific glyphs.',
        'Combining characters can alter glyph width and vertical alignment.',
      ]),
    );
  });

  it('returns preview font stacks', () => {
    expect(getPreviewFontFamily('monospace')).toContain('ui-monospace');
    expect(getPreviewFontFamily('system')).toContain('system-ui');
    expect(getPreviewFontFamily('emoji-safe')).toContain('Apple Color Emoji');
  });
});
