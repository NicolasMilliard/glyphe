import { cursorBlock } from './items/cursor-block';
import { loaderBars } from './items/loader-bars';
import { loaderWaveform } from './items/loader-waveform';
import { progressAscii } from './items/progress-ascii';
import { progressBlocks } from './items/progress-blocks';
import { spinnerBraille } from './items/spinner-braille';
import { spinnerClock } from './items/spinner-clock';
import { spinnerDots } from './items/spinner-dots';
import { spinnerLine } from './items/spinner-line';
import { textGlitchSoft } from './items/text-glitch-soft';
import { textScramble } from './items/text-scramble';
import { textTypewriter } from './items/text-typewriter';
import type { AnimationCategory, RegistryItem } from './schema';
import { assertUniqueSlugs } from './validation';

export const registryItems = assertUniqueSlugs([
  spinnerBraille,
  spinnerDots,
  spinnerLine,
  spinnerClock,
  loaderWaveform,
  loaderBars,
  progressAscii,
  progressBlocks,
  cursorBlock,
  textGlitchSoft,
  textTypewriter,
  textScramble,
] satisfies RegistryItem[]);

export function getRegistryItem(slug: string) {
  return registryItems.find((item) => item.slug === slug);
}

export function getRegistryItemsByCategory(category: AnimationCategory) {
  return registryItems.filter((item) => item.category === category);
}

export function requireRegistryItem(slug: string) {
  const item = getRegistryItem(slug);

  if (!item) {
    throw new Error(`Registry item not found: ${slug}`);
  }

  return item;
}

export type {
  AnimationCategory,
  RegistryItem,
  RenderingStrategy,
} from './schema';
