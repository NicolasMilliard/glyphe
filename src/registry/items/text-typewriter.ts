import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const textTypewriter = {
  name: 'Typewriter Text',
  slug: createRegistrySlug('text', 'typewriter'),
  category: 'text',
  description: 'A typewriter primitive that reveals readable text over time.',
  tags: ['text', 'typewriter', 'typing'],
  duration: 1600,
  timing: 'steps',
  loop: false,
  strategy: 'scripted',
  accessibility: {
    decorative: false,
    reducedMotion: 'static-label',
    ariaHiddenRecommended: false,
  },
  compatibility: {
    requiresMonospace: false,
    unicodeSensitive: false,
    supportsCssOnly: false,
  },
  options: {
    speed: {
      default: 1600,
      min: 500,
      max: 5000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent'],
  },
} satisfies RegistryItem;
