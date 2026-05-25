import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const loaderBars = {
  name: 'Bars Loader',
  slug: createRegistrySlug('loader', 'bars'),
  category: 'loader',
  description: 'A compact three-bar loader with stable block-height frames.',
  tags: ['loader', 'bars', 'loading', 'unicode'],
  frames: ['▁▃▅', '▃▅▇', '▅▇▅', '▇▅▃', '▅▃▁', '▃▁▃'],
  duration: 850,
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
    unicodeSensitive: true,
    supportsCssOnly: true,
  },
  options: {
    speed: {
      default: 850,
      min: 350,
      max: 2000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent', 'muted'],
  },
} satisfies RegistryItem;
