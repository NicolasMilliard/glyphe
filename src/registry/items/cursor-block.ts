import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const cursorBlock = {
  name: 'Block Cursor',
  slug: createRegistrySlug('cursor', 'block'),
  category: 'cursor',
  description: 'A blinking terminal block cursor for text and prompt effects.',
  tags: ['cursor', 'terminal', 'blink'],
  frames: ['█', ' '],
  duration: 1000,
  timing: 'steps',
  loop: true,
  strategy: 'stacked-spans',
  accessibility: {
    decorative: true,
    reducedMotion: 'disabled',
    ariaHiddenRecommended: true,
  },
  compatibility: {
    requiresMonospace: true,
    unicodeSensitive: true,
    supportsCssOnly: true,
    glyphWidth: 'single',
    unicodeRisk: 'medium',
    emojiRisk: 'none',
    recommendedFontStack: 'monospace',
  },
  options: {
    speed: {
      default: 1000,
      min: 500,
      max: 2000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent'],
  },
} satisfies RegistryItem;
