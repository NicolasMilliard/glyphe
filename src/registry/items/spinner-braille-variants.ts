import type { RegistryItem } from '../schema';
import { createRegistrySlug } from '../slug';

type BrailleVariant = {
  name: string;
  slug: string;
  description: string;
  frames: string[];
  duration?: number;
  tags?: string[];
};

const brailleVariants = [
  {
    name: 'Braille Orbit',
    slug: 'braille-orbit',
    description: 'A braille spinner that moves a single dot around the cell.',
    frames: ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
  },
  {
    name: 'Braille Snake',
    slug: 'braille-snake',
    description: 'A zig-zag braille spinner that fills like a moving trail.',
    frames: ['⠁', '⠉', '⠙', '⠛', '⠟', '⠿', '⠟', '⠛', '⠙', '⠉'],
  },
  {
    name: 'Braille Fill Sweep',
    slug: 'braille-fill-sweep',
    description: 'A compact fill sweep that grows toward a full braille cell.',
    frames: ['⠁', '⠃', '⠇', '⠏', '⠟', '⠿'],
    duration: 700,
  },
  {
    name: 'Braille Scan',
    slug: 'braille-scan',
    description: 'A scanning braille motion that crosses the cell.',
    frames: ['⠇', '⠿', '⠸', '⠿'],
  },
  {
    name: 'Braille Pulse',
    slug: 'braille-pulse',
    description: 'A pulsing braille spinner that blooms then recedes.',
    frames: ['⠁', '⠛', '⠿', '⣿', '⠿', '⠛', '⠁'],
    duration: 1000,
  },
  {
    name: 'Braille Cascade',
    slug: 'braille-cascade',
    description: 'A cascading braille fill that builds into a solid block.',
    frames: ['⠉', '⠛', '⠿', '⣿'],
  },
  {
    name: 'Braille Checkerboard',
    slug: 'braille-checkerboard',
    description: 'A checkerboard braille pulse for compact activity states.',
    frames: ['⠅', '⠅', '⠪', '⠪', '⠕', '⠕', '⠪', '⠪'],
    duration: 900,
  },
  {
    name: 'Braille Rain',
    slug: 'braille-rain',
    description: 'A compact braille droplet with a brief rest between falls.',
    frames: ['⠉', '⠒', '⠤', '⠀'],
    duration: 900,
  },
  {
    name: 'Braille Fireworks',
    slug: 'braille-sparkle',
    description: 'A small braille burst that opens from a single dot.',
    frames: ['⠁', '⠂', '⠐', '⠨', '⠵', '⠪', '⠐', '⠁'],
    tags: ['fireworks'],
  },
  {
    name: 'Braille Wave',
    slug: 'braille-wave',
    description:
      'A row-based braille wave that rises and falls through a cell.',
    frames: ['⠁', '⠉', '⠙', '⠹', '⠽', '⠿', '⠾', '⠶', '⠦', '⠆', '⠂'],
  },
  {
    name: 'Braille Twist',
    slug: 'braille-dna',
    description: 'A twisting braille loop with alternating diagonal tension.',
    frames: ['⠁', '⠢', '⠔', '⡈', '⢐', '⠢', '⠔', '⡈'],
  },
  {
    name: 'Braille Matrix',
    slug: 'braille-matrix',
    description: 'A matrix-like braille fill that resolves into a block.',
    frames: ['⡀', '⣀', '⣄', '⣤', '⣦', '⣶', '⣷', '⣿'],
    tags: ['matrix'],
  },
] satisfies BrailleVariant[];

export const spinnerBrailleVariants = brailleVariants.map(createBrailleVariant);

function createBrailleVariant(variant: BrailleVariant): RegistryItem {
  return {
    name: variant.name,
    slug: createRegistrySlug('spinner', variant.slug),
    category: 'spinner',
    description: variant.description,
    tags: ['spinner', 'braille', 'loading', 'unicode', ...(variant.tags ?? [])],
    frames: variant.frames,
    duration: variant.duration ?? 800,
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
      glyphWidth: 'single',
      unicodeRisk: 'medium',
      emojiRisk: 'none',
      recommendedFontStack: 'monospace',
    },
    options: {
      speed: {
        default: variant.duration ?? 800,
        min: 300,
        max: 2200,
      },
      size: ['sm', 'md', 'lg'],
      color: ['currentColor', 'accent', 'muted'],
    },
  };
}
