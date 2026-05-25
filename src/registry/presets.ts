import { registryItems } from './index';

export const generatorPresetSlugs = [
  'spinner/braille',
  'spinner/line',
  'loader/waveform',
  'progress/ascii',
  'cursor/braille',
  'text/typewriter',
  'text/glitch-3d',
] as const;

export const firstClassCliInstallSlugs = [
  'spinner/braille',
  'spinner/line',
  'loader/waveform',
  'progress/ascii',
  'cursor/block',
  'cursor/braille',
  'text/typewriter',
  'text/scramble',
  'text/glitch-soft',
  'text/glitch-3d',
] as const;

export function getGeneratorPresets() {
  return getRegistryItemsBySlugs(generatorPresetSlugs);
}

export function getFirstClassCliInstallItems() {
  return getRegistryItemsBySlugs(firstClassCliInstallSlugs);
}

function getRegistryItemsBySlugs(slugs: readonly string[]) {
  return slugs
    .map((slug) => registryItems.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);
}
