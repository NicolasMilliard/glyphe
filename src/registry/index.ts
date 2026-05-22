import { spinnerBraille } from './items/spinner-braille';
import type { AnimationCategory, RegistryItem } from './schema';
import { assertUniqueSlugs } from './validation';

export const registryItems = assertUniqueSlugs([
  spinnerBraille,
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
