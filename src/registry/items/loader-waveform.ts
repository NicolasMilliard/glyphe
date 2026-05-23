import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const loaderWaveform = {
  name: 'Waveform Loader',
  slug: createRegistrySlug('loader', 'waveform'),
  category: 'loader',
  description: 'A text waveform loader using block-height unicode frames.',
  tags: ['loader', 'waveform', 'audio', 'unicode'],
  frames: ['▁▃▅▇▅▃', '▃▅▇▅▃▁', '▅▇▅▃▁▃', '▇▅▃▁▃▅'],
  duration: 900,
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
      default: 900,
      min: 400,
      max: 2200,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent', 'muted'],
  },
} satisfies RegistryItem;
