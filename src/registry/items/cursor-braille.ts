import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const cursorBraille = {
  name: 'Braille Cursor',
  slug: createRegistrySlug('cursor', 'braille'),
  category: 'cursor',
  description:
    'A dense braille cursor that alternates between slim and filled states.',
  tags: ['cursor', 'braille', 'terminal', 'blink'],
  frames: ['⡇', '⣿'],
  duration: 900,
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
      default: 900,
      min: 400,
      max: 2000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent'],
  },
} satisfies RegistryItem;
