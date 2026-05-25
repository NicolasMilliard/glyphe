import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const textGlitchSoft = {
  name: 'Soft Glitch Text',
  slug: createRegistrySlug('text', 'glitch-soft'),
  category: 'text',
  description: 'A restrained text glitch effect for labels and short headings.',
  tags: ['text', 'glitch', 'effect'],
  frames: ['Glyphe'],
  duration: 1200,
  timing: 'steps',
  loop: true,
  strategy: 'transform',
  accessibility: {
    decorative: false,
    reducedMotion: 'disabled',
    ariaHiddenRecommended: false,
  },
  compatibility: {
    requiresMonospace: false,
    unicodeSensitive: false,
    supportsCssOnly: true,
    glyphWidth: 'multi',
    unicodeRisk: 'low',
    emojiRisk: 'none',
    recommendedFontStack: 'system',
  },
  options: {
    speed: {
      default: 1200,
      min: 600,
      max: 3000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent'],
  },
} satisfies RegistryItem;
