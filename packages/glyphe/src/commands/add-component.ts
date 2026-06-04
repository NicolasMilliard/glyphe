import { existsSync } from 'node:fs';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import {
  detectPackageManager,
  getInstalledDependencies,
  installMissingDependencies,
  readPackageJson,
} from '../package-manager.js';
import { readRegistryComponent, resolveRegistrySource } from '../registry.js';

export async function addComponent(component: string) {
  const cwd = process.cwd();
  const registry = await readRegistryComponent(component);
  const packageJson = await readPackageJson(cwd);
  const packageManager = detectPackageManager(cwd, packageJson);
  const installedDependencies = getInstalledDependencies(packageJson);
  const missingDependencies =
    registry.dependencies?.filter(
      (dependency) => !installedDependencies.has(dependency),
    ) ?? [];
  const installed: string[] = [];
  const skipped: string[] = [];

  for (const file of registry.files) {
    const sourcePath = resolveRegistrySource(file.source);
    const targetPath = path.resolve(cwd, file.target);
    const shouldSkipExisting = file.skipIfExists;

    if (shouldSkipExisting && existsSync(targetPath)) {
      skipped.push(file.target);
      continue;
    }

    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
    installed.push(file.target);
  }

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

  if (missingDependencies.length > 0) {
    installMissingDependencies(packageManager, missingDependencies, cwd);
  }
}
