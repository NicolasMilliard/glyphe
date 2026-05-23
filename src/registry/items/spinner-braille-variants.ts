import { createRegistrySlug } from '../slug';
import type { RegistryItem } from '../schema';

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
    frames: ['⠁', '⠂', '⠄', '⡀', '⠠', '⠐', '⠈', '⠁'],
  },
  {
    name: 'Braille Breathe',
    slug: 'braille-breathe',
    description: 'A soft braille spinner that expands and contracts.',
    frames: ['⠂', '⠆', '⠇', '⠧', '⠷', '⠿', '⠷', '⠧', '⠇', '⠆'],
    duration: 1000,
  },
  {
    name: 'Braille Snake',
    slug: 'braille-snake',
    description: 'A braille spinner with a crawling snake-like trail.',
    frames: ['⠁', '⠃', '⠇', '⠧', '⠷', '⠿', '⠾', '⠼', '⠸', '⠰'],
  },
  {
    name: 'Braille Fillsweep',
    slug: 'braille-fillsweep',
    description: 'A compact fill sweep that grows toward a full braille cell.',
    frames: ['⠁', '⠃', '⠇', '⠏', '⠟', '⠿'],
    duration: 700,
  },
  {
    name: 'Braille Diagonal Swipe',
    slug: 'braille-diagswipe',
    description: 'A diagonal braille swipe for subtle loading states.',
    frames: ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
  },
  {
    name: 'Braille Scan',
    slug: 'braille-scan',
    description: 'A scanning braille motion that crosses the cell.',
    frames: ['⠈', '⠘', '⠸', '⠰', '⠠', '⢀', '⣀', '⡀'],
  },
  {
    name: 'Braille Pulse',
    slug: 'braille-pulse',
    description: 'A pulsing braille spinner that blooms then recedes.',
    frames: ['⠂', '⠆', '⠖', '⠶', '⠷', '⠿', '⠷', '⠶', '⠖', '⠆'],
    duration: 1000,
  },
  {
    name: 'Braille Cascade',
    slug: 'braille-cascade',
    description: 'A cascading braille fill that builds into a solid block.',
    frames: ['⠁', '⠃', '⠇', '⡇', '⣇', '⣧', '⣷', '⣿'],
  },
  {
    name: 'Braille Columns',
    slug: 'braille-columns',
    description: 'A column-weight braille loader with a dense center frame.',
    frames: ['⡇', '⣇', '⣧', '⣷', '⣿', '⣷', '⣧', '⣇'],
  },
  {
    name: 'Braille Scanline',
    slug: 'braille-scanline',
    description: 'A scanline-style braille spinner with sweeping density.',
    frames: ['⠉', '⠋', '⠛', '⠟', '⠿', '⢿', '⡿', '⣟'],
  },
  {
    name: 'Braille Checkerboard',
    slug: 'braille-checkerboard',
    description: 'A checkerboard braille flicker for compact activity states.',
    frames: ['⠅', '⠪', '⠕', '⠪', '⠅', '⠪'],
    duration: 700,
  },
  {
    name: 'Braille Rain',
    slug: 'braille-rain',
    description: 'A falling braille droplet animation.',
    frames: ['⠂', '⠂', '⠆', '⠖', '⠶', '⠦', '⠤', '⠠'],
  },
  {
    name: 'Braille Sparkle',
    slug: 'braille-sparkle',
    description: 'A light sparkle pattern using sparse braille dots.',
    frames: ['⠁', '⠂', '⠄', '⠂', '⠁', '⠈', '⠐', '⠠', '⢀'],
    tags: ['sparkle'],
  },
  {
    name: 'Braille Wave Rows',
    slug: 'braille-waverows',
    description: 'A row-based braille wave for subtle terminal motion.',
    frames: ['⠁', '⠉', '⠙', '⠹', '⠸', '⠰', '⠠', '⠄'],
  },
  {
    name: 'Braille Helix',
    slug: 'braille-helix',
    description: 'A braille helix loop with alternating diagonal motion.',
    frames: ['⠁', '⠃', '⠆', '⠌', '⠘', '⠰', '⢀', '⡀'],
  },
  {
    name: 'Braille Wave',
    slug: 'braille-wave',
    description: 'A dense braille wave that rolls across filled cells.',
    frames: ['⠁', '⠃', '⠇', '⠧', '⠷', '⠯', '⠟', '⠻'],
  },
  {
    name: 'Braille DNA',
    slug: 'braille-dna',
    description: 'A twisting braille loop inspired by strand motion.',
    frames: ['⠁', '⠢', '⠔', '⡈', '⢐', '⠢', '⠔', '⡈'],
  },
  {
    name: 'Braille Vortex',
    slug: 'braille-vortex',
    description: 'A tight braille vortex with a rotating weight shift.',
    frames: ['⠋', '⠙', '⠚', '⠞', '⠶', '⠦'],
    duration: 700,
    tags: ['vortex'],
  },
  {
    name: 'Braille Matrix',
    slug: 'braille-matrix',
    description: 'A matrix-like braille fill that resolves into a block.',
    frames: ['⡀', '⣀', '⣄', '⣤', '⣦', '⣶', '⣷', '⣿'],
    tags: ['matrix'],
  },
  {
    name: 'Braille Ping Pong',
    slug: 'braille-pingpong',
    description: 'A braille dot that bounces back through its path.',
    frames: ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈', '⠐', '⠠'],
    duration: 1000,
  },
  {
    name: 'Braille Tunnel',
    slug: 'braille-tunnel',
    description: 'A dense tunnel loop through heavy braille frames.',
    frames: ['⠿', '⠷', '⠯', '⠟', '⠻', '⠽', '⠾', '⠿'],
  },
  {
    name: 'Braille Binary',
    slug: 'braille-binary',
    description: 'A minimal binary-style braille blink.',
    frames: ['⠁', '⠈', '⠁', '⠈', '⠁', '⠈'],
    duration: 600,
    tags: ['binary'],
  },
  {
    name: 'Braille Ripple',
    slug: 'braille-ripple',
    description:
      'A ripple that expands through a full braille cell and returns.',
    frames: ['⠁', '⠃', '⠇', '⠧', '⠷', '⠿', '⠷', '⠧', '⠇', '⠃'],
    duration: 1000,
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
