#!/usr/bin/env node

const USAGE = `Usage:
  glyphe add <component>

Commands:
  add text    Add the Text typography primitive
`;

function main(args: string[]) {
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

  console.log('glyphe add text is scaffolded but not implemented yet.');
  console.log('Next step: wire the local registry into the file installer.');
  process.exitCode = 1;
}

main(process.argv.slice(2));
