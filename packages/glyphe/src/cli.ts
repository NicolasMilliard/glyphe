#!/usr/bin/env node

import { addComponent } from './commands/add-component.js';

const USAGE = `Usage:
  glyphe add <component>

Commands:
  add text    Add the Text typography primitive
`;

async function main(args: string[]) {
  const [command, component, ...extraArguments] = args;

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

  if (extraArguments.length > 0) {
    const label = extraArguments.length === 1 ? 'argument' : 'arguments';

    console.error(`Unknown ${label}: ${extraArguments.join(' ')}`);
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
