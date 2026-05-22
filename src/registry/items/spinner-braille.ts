import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

export const spinnerBraille = {
  name: 'Braille Spinner',
  slug: createRegistrySlug('spinner', 'braille'),
  category: 'spinner',
  description: 'A compact braille-frame spinner with stable monospace rhythm.',
  tags: ['spinner', 'braille', 'loading', 'unicode'],
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  duration: 800,
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
      default: 800,
      min: 300,
      max: 2000,
    },
    size: ['sm', 'md', 'lg'],
    color: ['currentColor', 'accent', 'muted'],
  },
} satisfies RegistryItem;
