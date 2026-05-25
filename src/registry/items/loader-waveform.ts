import type { RegistryItem } from '../schema';
import { createRegistrySlug } from '../slug';

export const loaderWaveform = {
  name: 'Waveform Loader',
  slug: createRegistrySlug('loader', 'waveform'),
  category: 'loader',
  description: 'A text waveform loader using block-height glyph frames.',
  tags: ['loader', 'waveform', 'audio', 'blocks', 'loading'],
  frames: [
    '▁▂▃▄▅▆',
    '▂▃▄▅▆▅',
    '▃▄▅▆▅▄',
    '▄▅▆▅▄▃',
    '▅▆▅▄▃▂',
    '▆▅▄▃▂▁',
    '▅▄▃▂▁▂',
    '▄▃▂▁▂▃',
    '▃▂▁▂▃▄',
    '▂▁▂▃▄▅',
  ],
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
    glyphWidth: 'multi',
    unicodeRisk: 'medium',
    emojiRisk: 'none',
    recommendedFontStack: 'monospace',
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
