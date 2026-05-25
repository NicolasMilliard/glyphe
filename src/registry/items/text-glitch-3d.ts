import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const textGlitch3d = {
  name: '3D Glitch Text',
  slug: createRegistrySlug('text', 'glitch-3d'),
  category: 'text',
  description: 'A chromatic red and blue text glitch inspired by anaglyph 3D.',
  tags: ['text', 'glitch', '3d', 'effect', 'chromatic'],
  frames: ['Glyphe'],
  duration: 1100,
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
      default: 1100,
      min: 600,
      max: 3000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor'],
  },
} satisfies RegistryItem;
