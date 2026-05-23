#!/usr/bin/env bun

import { fileURLToPath } from 'node:url';
import { installLocalRegistryItem, type InstallOutput } from './local-install';

type ParsedArgs = {
  command?: string;
  slug?: string;
  cwd: string;
  outputs: InstallOutput[];
  dryRun: boolean;
  force: boolean;
  componentName?: string;
};

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.command !== 'add' || !args.slug) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const plan = await installLocalRegistryItem({
    slug: args.slug,
    cwd: args.cwd,
    outputs: args.outputs,
    dryRun: args.dryRun,
    force: args.force,
    componentName: args.componentName,
  });

  console.log(
    `${args.dryRun ? 'Planned' : 'Installed'} ${plan.item.slug} (${plan.item.name})`,
  );

  for (const file of plan.files) {
    console.log(`- ${file.action}: ${file.path}`);
  }
}

export function parseArgs(args: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    command: args[0],
    slug: args[1],
    cwd: process.cwd(),
    outputs: [],
    dryRun: false,
    force: false,
  };

  for (let index = 2; index < args.length; index += 1) {
    const arg = args[index];

    switch (arg) {
      case '--all':
        parsed.outputs = ['css', 'react', 'tailwind'];
        break;
      case '--css':
        parsed.outputs.push('css');
        break;
      case '--react':
        parsed.outputs.push('react');
        break;
      case '--tailwind':
        parsed.outputs.push('tailwind');
        break;
      case '--dry-run':
        parsed.dryRun = true;
        break;
      case '--force':
        parsed.force = true;
        break;
      case '--cwd':
        parsed.cwd = requireValue(args, index, arg);
        index += 1;
        break;
      case '--name':
        parsed.componentName = requireValue(args, index, arg);
        index += 1;
        break;
      default:
        throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (parsed.outputs.length === 0) {
    parsed.outputs = ['css', 'react'];
  }

  parsed.outputs = Array.from(new Set(parsed.outputs));

  return parsed;
}

function requireValue(args: string[], index: number, flag: string) {
  const value = args[index + 1];

  if (!value) {
    throw new Error(`${flag} requires a value`);
  }

  return value;
}

function printUsage() {
  console.log(`Usage:
  glyphe add <slug> [--css] [--react] [--tailwind] [--all]
  glyphe add spinner/braille --all --dry-run`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
