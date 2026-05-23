import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const progressBlocks = {
  name: 'Block Progress',
  slug: createRegistrySlug('progress', 'blocks'),
  category: 'progress',
  description: 'A unicode block progress indicator with fixed-width frames.',
  tags: ['progress', 'blocks', 'unicode', 'bar'],
  frames: ['░░░░░', '█░░░░', '██░░░', '███░░', '████░', '█████'],
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
    unicodeSensitive: true,
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
