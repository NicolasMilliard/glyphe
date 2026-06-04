import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { InstallCommand, PackageJson, PackageManager } from './types.js';

export async function readPackageJson(cwd: string) {
  try {
    const contents = await readFile(path.join(cwd, 'package.json'), 'utf8');

    return JSON.parse(contents) as PackageJson;
  } catch {
    return undefined;
  }
}

export function detectPackageManager(
  cwd: string,
  packageJson?: PackageJson,
): PackageManager {
  const packageManager = packageJson?.packageManager?.split('@')[0];

  if (
    packageManager === 'npm' ||
    packageManager === 'pnpm' ||
    packageManager === 'yarn' ||
    packageManager === 'bun'
  ) {
    return packageManager;
  }

  if (existsSync(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  if (existsSync(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  if (
    existsSync(path.join(cwd, 'bun.lock')) ||
    existsSync(path.join(cwd, 'bun.lockb'))
  ) {
    return 'bun';
  }

  return 'npm';
}

export function getInstalledDependencies(packageJson?: PackageJson) {
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

export function installMissingDependencies(
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
      `Failed to run ${installCommand.command}. Install dependencies manually with: ${formatInstallCommand(installCommand)}`,
    );
  }

  if (result.signal !== null) {
    throw new Error(
      `Dependency installation stopped with signal ${result.signal}`,
    );
  }

  if (result.status !== 0) {
    throw new Error(
      `Failed to run ${installCommand.command}. Install dependencies manually with: ${formatInstallCommand(installCommand)}`,
    );
  }
}
