import * as z from 'zod';

export const animationCategories = [
  'spinner',
  'loader',
  'progress',
  'text',
  'matrix',
  'cursor',
] as const;

export const renderingStrategies = [
  'stacked-spans',
  'css-var-swap',
  'pseudo-content',
  'transform',
  'scripted',
] as const;

export const animationTimingModes = [
  'steps',
  'linear',
  'ease',
  'custom',
] as const;

export const reducedMotionModes = [
  'first-frame',
  'static-label',
  'disabled',
  'slowed',
] as const;

export const glyphWidthModes = ['single', 'multi', 'variable'] as const;

export const unicodeRiskLevels = ['low', 'medium', 'high'] as const;

export const emojiRiskLevels = ['none', 'low', 'medium', 'high'] as const;

export const recommendedFontStacks = [
  'monospace',
  'system',
  'emoji-safe',
] as const;

export const registryAccessibilitySchema = z.object({
  decorative: z.boolean(),
  defaultLabel: z.string().min(1).optional(),
  reducedMotion: z.enum(reducedMotionModes),
  ariaHiddenRecommended: z.boolean(),
});

export const registryCompatibilitySchema = z.object({
  requiresMonospace: z.boolean(),
  unicodeSensitive: z.boolean(),
  supportsCssOnly: z.boolean(),
  glyphWidth: z.enum(glyphWidthModes).optional(),
  unicodeRisk: z.enum(unicodeRiskLevels).optional(),
  emojiRisk: z.enum(emojiRiskLevels).optional(),
  recommendedFontStack: z.enum(recommendedFontStacks).optional(),
  fontFallbackNotes: z.array(z.string().min(1)).optional(),
});

export const registryOptionSchema = z.object({
  speed: z
    .object({
      default: z.number().positive(),
      min: z.number().positive(),
      max: z.number().positive(),
    })
    .optional(),
  size: z.array(z.string().min(1)).optional(),
  color: z.array(z.string().min(1)).optional(),
});

export const registryItemSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum(animationCategories),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)),
  frames: z.array(z.string().min(1)).optional(),
  duration: z.number().positive(),
  timing: z.enum(animationTimingModes),
  loop: z.boolean(),
  strategy: z.enum(renderingStrategies),
  accessibility: registryAccessibilitySchema,
  compatibility: registryCompatibilitySchema,
  options: registryOptionSchema.default({}),
});

export type AnimationCategory = (typeof animationCategories)[number];
export type EmojiRiskLevel = (typeof emojiRiskLevels)[number];
export type GlyphWidthMode = (typeof glyphWidthModes)[number];
export type RecommendedFontStack = (typeof recommendedFontStacks)[number];
export type RenderingStrategy = (typeof renderingStrategies)[number];
export type UnicodeRiskLevel = (typeof unicodeRiskLevels)[number];
export type RegistryItem = z.infer<typeof registryItemSchema>;
