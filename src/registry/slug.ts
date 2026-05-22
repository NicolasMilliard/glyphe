import type { AnimationCategory } from './schema';

export function createRegistrySlug(category: AnimationCategory, name: string) {
  return `${category}/${slugify(name)}`;
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
