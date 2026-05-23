import type {
  EmojiRiskLevel,
  GlyphWidthMode,
  RecommendedFontStack,
  RegistryItem,
  UnicodeRiskLevel,
} from '@/registry';

type UnicodeCompatibilityGuidance = {
  glyphWidth: GlyphWidthMode;
  unicodeRisk: UnicodeRiskLevel;
  emojiRisk: EmojiRiskLevel;
  recommendedFontStack: RecommendedFontStack;
  warnings: string[];
  monospaceNote: string;
  fontFallbackNote: string;
};

export const previewFontStackOptions = [
  {
    label: 'Monospace',
    value: 'monospace',
  },
  {
    label: 'System',
    value: 'system',
  },
  {
    label: 'Emoji-safe',
    value: 'emoji-safe',
  },
] as const;

const emojiPattern = /\p{Extended_Pictographic}/u;
const combiningMarkPattern = /[\u0300-\u036f]/;

export function getUnicodeCompatibilityGuidance(
  item: RegistryItem,
): UnicodeCompatibilityGuidance {
  const frames = item.frames ?? [item.name];
  const hasEmoji = frames.some(hasEmojiGlyph);
  const hasCombiningMarks = frames.some(hasCombiningCharacter);
  const hasNonAscii = frames.some(hasNonAsciiCharacter);
  const hasMultiCharacterFrames = frames.some(
    (frame) => Array.from(frame).length > 1,
  );

  const glyphWidth =
    item.compatibility.glyphWidth ??
    inferGlyphWidth({
      hasCombiningMarks,
      hasEmoji,
      hasMultiCharacterFrames,
    });
  const emojiRisk =
    item.compatibility.emojiRisk ?? inferEmojiRisk({ hasEmoji, glyphWidth });
  const unicodeRisk =
    item.compatibility.unicodeRisk ??
    inferUnicodeRisk({
      hasCombiningMarks,
      hasEmoji,
      hasNonAscii,
      glyphWidth,
    });
  const recommendedFontStack =
    item.compatibility.recommendedFontStack ??
    inferRecommendedFontStack({
      hasEmoji,
      requiresMonospace: item.compatibility.requiresMonospace,
    });

  return {
    glyphWidth,
    unicodeRisk,
    emojiRisk,
    recommendedFontStack,
    warnings: getUnicodeWarnings({
      hasCombiningMarks,
      hasEmoji,
      hasMultiCharacterFrames,
      item,
    }),
    monospaceNote: getMonospaceAlignmentNote(item, glyphWidth),
    fontFallbackNote: getFontFallbackNote(item, recommendedFontStack),
  };
}

export function hasEmojiGlyph(value: string) {
  return emojiPattern.test(value);
}

export function hasCombiningCharacter(value: string) {
  return combiningMarkPattern.test(value);
}

export function hasNonAsciiCharacter(value: string) {
  return Array.from(value).some((character) => character.charCodeAt(0) > 127);
}

export function getPreviewFontFamily(fontStack: RecommendedFontStack) {
  switch (fontStack) {
    case 'emoji-safe':
      return 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    case 'monospace':
      return 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';
    case 'system':
      return 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  }
}

function inferGlyphWidth({
  hasCombiningMarks,
  hasEmoji,
  hasMultiCharacterFrames,
}: {
  hasCombiningMarks: boolean;
  hasEmoji: boolean;
  hasMultiCharacterFrames: boolean;
}): GlyphWidthMode {
  if (hasEmoji || hasCombiningMarks) {
    return 'variable';
  }

  return hasMultiCharacterFrames ? 'multi' : 'single';
}

function inferEmojiRisk({
  hasEmoji,
  glyphWidth,
}: {
  hasEmoji: boolean;
  glyphWidth: GlyphWidthMode;
}): EmojiRiskLevel {
  if (!hasEmoji) {
    return 'none';
  }

  return glyphWidth === 'variable' ? 'high' : 'medium';
}

function inferUnicodeRisk({
  hasCombiningMarks,
  hasEmoji,
  hasNonAscii,
  glyphWidth,
}: {
  hasCombiningMarks: boolean;
  hasEmoji: boolean;
  hasNonAscii: boolean;
  glyphWidth: GlyphWidthMode;
}): UnicodeRiskLevel {
  if (hasCombiningMarks || hasEmoji || glyphWidth === 'variable') {
    return 'high';
  }

  if (hasNonAscii || glyphWidth === 'multi') {
    return 'medium';
  }

  return 'low';
}

function inferRecommendedFontStack({
  hasEmoji,
  requiresMonospace,
}: {
  hasEmoji: boolean;
  requiresMonospace: boolean;
}): RecommendedFontStack {
  if (hasEmoji) {
    return 'emoji-safe';
  }

  return requiresMonospace ? 'monospace' : 'system';
}

function getUnicodeWarnings({
  hasCombiningMarks,
  hasEmoji,
  hasMultiCharacterFrames,
  item,
}: {
  hasCombiningMarks: boolean;
  hasEmoji: boolean;
  hasMultiCharacterFrames: boolean;
  item: RegistryItem;
}) {
  const warnings = [...(item.compatibility.fontFallbackNotes ?? [])];

  if (hasMultiCharacterFrames) {
    warnings.push(
      'Some frames contain multiple glyphs and may need a fixed width.',
    );
  }

  if (hasEmoji) {
    warnings.push(
      'Emoji can render as double-width, colored, or platform-specific glyphs.',
    );
  }

  if (hasCombiningMarks) {
    warnings.push(
      'Combining characters can alter glyph width and vertical alignment.',
    );
  }

  return warnings;
}

function getMonospaceAlignmentNote(
  item: RegistryItem,
  glyphWidth: GlyphWidthMode,
) {
  if (!item.compatibility.requiresMonospace) {
    return 'Monospace is optional for this animation.';
  }

  if (glyphWidth === 'variable') {
    return 'Use a monospace container, but verify glyph width across target platforms.';
  }

  return 'Use a monospace font stack to keep frames aligned.';
}

function getFontFallbackNote(
  item: RegistryItem,
  recommendedFontStack: RecommendedFontStack,
) {
  if (item.compatibility.fontFallbackNotes?.length) {
    return item.compatibility.fontFallbackNotes.join(' ');
  }

  switch (recommendedFontStack) {
    case 'emoji-safe':
      return 'Include platform emoji fonts after the main UI stack.';
    case 'monospace':
      return 'Prefer ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, and monospace.';
    case 'system':
      return 'The system UI stack is acceptable when frame widths do not need strict alignment.';
  }
}
