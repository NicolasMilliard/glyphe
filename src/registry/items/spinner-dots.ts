import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const spinnerDots = {
  name: 'Dots Spinner',
  slug: createRegistrySlug('spinner', 'dots'),
  category: 'spinner',
  description: 'A minimal dot spinner for compact loading states.',
  tags: ['spinner', 'dots', 'loading', 'ascii'],
  frames: ['.', '..', '...', ''],
  duration: 900,
  timing: 'steps',
  loop: true,
  strategy: 'stacked-spans',
  accessibility: {
    decorative: true,
    defaultLabel: 'Loading',
    reducedMotion: 'static-label',
    ariaHiddenRecommended: true,
  },
  compatibility: {
    requiresMonospace: true,
    unicodeSensitive: false,
    supportsCssOnly: true,
    glyphWidth: 'variable',
    unicodeRisk: 'low',
    emojiRisk: 'none',
    recommendedFontStack: 'monospace',
  },
  options: {
    speed: {
      default: 900,
      min: 300,
      max: 2000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent', 'muted'],
  },
} satisfies RegistryItem;
