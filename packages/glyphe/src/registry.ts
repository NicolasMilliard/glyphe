import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { RegistryComponent } from './types.js';

export async function readRegistryComponent(component: string) {
  const registryUrl = new URL(`../registry/${component}.json`, import.meta.url);
  const contents = await readFile(registryUrl, 'utf8');

  return JSON.parse(contents) as RegistryComponent;
}

export function resolveRegistrySource(source: string) {
  return fileURLToPath(new URL(`../${source}`, import.meta.url));
}
