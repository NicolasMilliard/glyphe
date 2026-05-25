import { describe, expect, it } from 'vitest';
import { getRegistryItem, requireRegistryItem } from './index';
import {
  firstClassCliInstallSlugs,
  generatorPresetSlugs,
  getGeneratorPresets,
} from './presets';
import { createRegistrySlug, slugify } from './slug';

describe('registry slugs', () => {
  it('slugifies labels', () => {
    expect(slugify(' Braille Spinner! ')).toBe('braille-spinner');
  });

  it('creates category-prefixed registry slugs', () => {
    expect(createRegistrySlug('spinner', 'Braille Spinner')).toBe(
      'spinner/braille-spinner',
    );
  });

  it('looks up registry items by slug', () => {
    expect(getRegistryItem('spinner/braille')?.name).toBe('Braille Spinner');
    expect(getRegistryItem('cursor/braille')?.frames).toEqual(['⡇', '⣿']);
    expect(getRegistryItem('text/glitch-3d')?.name).toBe('3D Glitch Text');
  });

  it('requires registry items by slug', () => {
    expect(requireRegistryItem('spinner/braille').slug).toBe('spinner/braille');
  });

  it('throws when a required item is missing', () => {
    expect(() => requireRegistryItem('spinner/missing')).toThrow(
      'Registry item not found: spinner/missing',
    );
  });

  it('keeps curated preset slugs resolvable', () => {
    for (const slug of generatorPresetSlugs) {
      expect(getRegistryItem(slug)).toBeDefined();
    }

    for (const slug of firstClassCliInstallSlugs) {
      expect(getRegistryItem(slug)).toBeDefined();
    }

    expect(getGeneratorPresets().map((item) => item.slug)).toEqual([
      ...generatorPresetSlugs,
    ]);
  });

  it('keeps generator presets focused on teaching examples', () => {
    expect(getGeneratorPresets().map((item) => item.slug)).toEqual([
      'spinner/braille',
      'spinner/line',
      'loader/waveform',
      'progress/ascii',
      'text/typewriter',
    ]);
  });
});
