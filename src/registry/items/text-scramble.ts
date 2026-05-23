import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const textScramble = {
  name: 'Scramble Text',
  slug: createRegistrySlug('text', 'scramble'),
  category: 'text',
  description:
    'A text scramble primitive for resolving noisy glyphs into copy.',
  tags: ['text', 'scramble', 'effect'],
  frames: ['GLYPHE', '6L¥P#E', 'G1Y*HE', 'GLYPHE'],
  duration: 1300,
  timing: 'steps',
  loop: false,
  strategy: 'scripted',
  accessibility: {
    decorative: false,
    reducedMotion: 'static-label',
    ariaHiddenRecommended: false,
  },
  compatibility: {
    requiresMonospace: true,
    unicodeSensitive: true,
    supportsCssOnly: false,
  },
  options: {
    speed: {
      default: 1300,
      min: 500,
      max: 4000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent'],
  },
} satisfies RegistryItem;
