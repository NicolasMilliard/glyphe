import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const progressAscii = {
  name: 'ASCII Progress',
  slug: createRegistrySlug('progress', 'ascii'),
  category: 'progress',
  description: 'A stepped ASCII progress indicator for terminal-style UI.',
  tags: ['progress', 'ascii', 'bar'],
  frames: ['[>    ]', '[=>   ]', '[==>  ]', '[===> ]', '[====>]', '[=====]'],
  duration: 1400,
  timing: 'steps',
  loop: true,
  strategy: 'stacked-spans',
  accessibility: {
    decorative: false,
    defaultLabel: 'Progress loading',
    reducedMotion: 'static-label',
    ariaHiddenRecommended: false,
  },
  compatibility: {
    requiresMonospace: true,
    unicodeSensitive: false,
    supportsCssOnly: true,
  },
  options: {
    speed: {
      default: 1400,
      min: 600,
      max: 4000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent', 'muted'],
  },
} satisfies RegistryItem;
