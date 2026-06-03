#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const USAGE = `Usage:
  glyphe add <component>

Commands:
  add text    Add the Text typography primitive
`;

type RegistryFile = {
  source: string;
  target: string;
  skipIfExists?: boolean;
};

type RegistryComponent = {
  name: string;
  description?: string;
  files: RegistryFile[];
  dependencies?: string[];
  notes?: string[];
};

async function readRegistryComponent(component: string) {
  const registryUrl = new URL(`../registry/${component}.json`, import.meta.url);
  const contents = await readFile(registryUrl, 'utf8');

  return JSON.parse(contents) as RegistryComponent;
}

function resolveRegistrySource(source: string) {
  return fileURLToPath(new URL(`../${source}`, import.meta.url));
}

async function addComponent(component: string) {
  const registry = await readRegistryComponent(component);
  const installed: string[] = [];
  const skipped: string[] = [];

  for (const file of registry.files) {
    const sourcePath = resolveRegistrySource(file.source);
    const targetPath = path.resolve(process.cwd(), file.target);
    const shouldSkipExisting = file.skipIfExists ?? true;

    if (shouldSkipExisting && existsSync(targetPath)) {
      skipped.push(file.target);
      continue;
    }

    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
    installed.push(file.target);
  }

  console.log(`Added ${registry.name}.`);

  if (installed.length > 0) {
    console.log('\nInstalled files:');
    for (const file of installed) {
      console.log(`  ${file}`);
    }
  }

  if (skipped.length > 0) {
    console.log('\nSkipped existing files:');
    for (const file of skipped) {
      console.log(`  ${file}`);
    }
  }

  if (registry.dependencies !== undefined && registry.dependencies.length > 0) {
    console.log('\nInstall dependencies if needed:');
    console.log(`  bun add ${registry.dependencies.join(' ')}`);
  }

  if (registry.notes !== undefined && registry.notes.length > 0) {
    console.log('\nNotes:');
    for (const note of registry.notes) {
      console.log(`  - ${note}`);
    }
  }
}

async function main(args: string[]) {
  const [command, component] = args;

  if (command === undefined || command === '--help' || command === '-h') {
    console.log(USAGE);
    return;
  }

  if (command !== 'add') {
    console.error(`Unknown command: ${command}`);
    console.error(USAGE);
    process.exitCode = 1;
    return;
  }

  if (component !== 'text') {
    console.error(
      component === undefined
        ? 'Missing component name.'
        : `Unknown component: ${component}`,
    );
    console.error(USAGE);
    process.exitCode = 1;
    return;
  }

  await addComponent(component);
}

main(process.argv.slice(2)).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
