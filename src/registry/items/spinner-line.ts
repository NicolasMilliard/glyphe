import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const spinnerLine = {
  name: 'Line Spinner',
  slug: createRegistrySlug('spinner', 'line'),
  category: 'spinner',
  description: 'A classic terminal line spinner with four ASCII frames.',
  tags: ['spinner', 'line', 'loading', 'ascii'],
  frames: ['|', '/', '-', '\\'],
  duration: 600,
  timing: 'steps',
  loop: true,
  strategy: 'stacked-spans',
  accessibility: {
    decorative: true,
    defaultLabel: 'Loading',
    reducedMotion: 'first-frame',
    ariaHiddenRecommended: true,
  },
  compatibility: {
    requiresMonospace: true,
    unicodeSensitive: false,
    supportsCssOnly: true,
  },
  options: {
    speed: {
      default: 600,
      min: 250,
      max: 1600,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent', 'muted'],
  },
} satisfies RegistryItem;
