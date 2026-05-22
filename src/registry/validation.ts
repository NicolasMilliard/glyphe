import { registryItemSchema, type RegistryItem } from './schema';

export function validateRegistryItem(item: unknown) {
  return registryItemSchema.parse(item);
}

export function validateRegistry(items: unknown[]) {
  return assertUniqueSlugs(items.map(validateRegistryItem));
}

export function assertUniqueSlugs(items: RegistryItem[]) {
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.slug)) {
      throw new Error(`Duplicate registry slug: ${item.slug}`);
    }

    seen.add(item.slug);
  }

  return items;
}
