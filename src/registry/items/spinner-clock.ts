import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const spinnerClock = {
  name: 'Clock Spinner',
  slug: createRegistrySlug('spinner', 'clock'),
  category: 'spinner',
  description: 'A unicode clock spinner for status and waiting states.',
  tags: ['spinner', 'clock', 'loading', 'unicode'],
  frames: ['◴', '◷', '◶', '◵'],
  duration: 700,
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
    requiresMonospace: false,
    unicodeSensitive: true,
    supportsCssOnly: true,
  },
  options: {
    speed: {
      default: 700,
      min: 300,
      max: 1800,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent', 'muted'],
  },
} satisfies RegistryItem;
