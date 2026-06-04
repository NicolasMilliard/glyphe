#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
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
};

type PackageJson = {
  packageManager?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
};

type PackageManager = 'bun' | 'npm' | 'pnpm' | 'yarn';

type InstallCommand = {
  command: PackageManager;
  args: string[];
};

async function readRegistryComponent(component: string) {
  const registryUrl = new URL(`../registry/${component}.json`, import.meta.url);
  const contents = await readFile(registryUrl, 'utf8');

  return JSON.parse(contents) as RegistryComponent;
}

async function readPackageJson(cwd: string) {
  try {
    const contents = await readFile(path.join(cwd, 'package.json'), 'utf8');

    return JSON.parse(contents) as PackageJson;
  } catch {
    return undefined;
  }
}

function resolveRegistrySource(source: string) {
  return fileURLToPath(new URL(`../${source}`, import.meta.url));
}

function detectPackageManager(cwd: string, packageJson?: PackageJson) {
  if (
    existsSync(path.join(cwd, 'bun.lock')) ||
    existsSync(path.join(cwd, 'bun.lockb'))
  ) {
    return 'bun';
  }

  if (existsSync(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  if (existsSync(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  if (
    existsSync(path.join(cwd, 'package-lock.json')) ||
    existsSync(path.join(cwd, 'npm-shrinkwrap.json'))
  ) {
    return 'npm';
  }

  if (packageJson?.packageManager?.startsWith('bun@')) {
    return 'bun';
  }

  if (packageJson?.packageManager?.startsWith('pnpm@')) {
    return 'pnpm';
  }

  if (packageJson?.packageManager?.startsWith('yarn@')) {
    return 'yarn';
  }

  if (packageJson?.packageManager?.startsWith('npm@')) {
    return 'npm';
  }

  return 'npm';
}

function getInstalledDependencies(packageJson?: PackageJson) {
  return new Set([
    ...Object.keys(packageJson?.dependencies ?? {}),
    ...Object.keys(packageJson?.devDependencies ?? {}),
    ...Object.keys(packageJson?.peerDependencies ?? {}),
    ...Object.keys(packageJson?.optionalDependencies ?? {}),
  ]);
}

function getInstallCommand(
  packageManager: PackageManager,
  dependencies: string[],
) {
  if (packageManager === 'npm') {
    return {
      command: 'npm',
      args: ['install', ...dependencies],
    } satisfies InstallCommand;
  }

  return {
    command: packageManager,
    args: ['add', ...dependencies],
  } satisfies InstallCommand;
}

function formatInstallCommand(installCommand: InstallCommand) {
  return [installCommand.command, ...installCommand.args].join(' ');
}

function installMissingDependencies(
  packageManager: PackageManager,
  dependencies: string[],
  cwd: string,
) {
  const installCommand = getInstallCommand(packageManager, dependencies);

  console.log('\nInstalling dependencies:');
  console.log(`  ${formatInstallCommand(installCommand)}`);

  const result = spawnSync(installCommand.command, installCommand.args, {
    cwd,
    stdio: 'inherit',
  });

  if (result.error !== undefined) {
    throw new Error(
      `Failed to run ${installCommand.command}. Install dependencies manually with: ${formatInstallCommand(
        installCommand,
      )}`,
    );
  }

  if (result.signal !== null) {
    throw new Error(
      `Dependency installation stopped with signal ${result.signal}.`,
    );
  }

  if (result.status !== 0) {
    throw new Error(
      `Dependency installation failed. Run manually with: ${formatInstallCommand(
        installCommand,
      )}`,
    );
  }
}

async function addComponent(component: string) {
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
    const shouldSkipExisting = file.skipIfExists ?? true;

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

async function main(args: string[]) {
  const [command, component, ...flags] = args;

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

  const unknownFlags = flags.filter((flag) => flag !== '--no-install');

  if (unknownFlags.length > 0) {
    console.error(`Unknown option: ${unknownFlags.join(', ')}`);
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
