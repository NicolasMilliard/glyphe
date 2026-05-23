import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseArgs } from './index';
import {
  createLocalInstallPlan,
  installLocalRegistryItem,
} from './local-install';

describe('local registry install prototype', () => {
  it('parses add arguments', () => {
    expect(
      parseArgs([
        'add',
        'spinner/braille',
        '--all',
        '--dry-run',
        '--cwd',
        '/tmp/project',
      ]),
    ).toMatchObject({
      command: 'add',
      slug: 'spinner/braille',
      cwd: '/tmp/project',
      outputs: ['css', 'react', 'tailwind'],
      dryRun: true,
    });
  });

  it('plans CSS, React, and Tailwind files', async () => {
    const cwd = await createFixture();
    const plan = await createLocalInstallPlan({
      slug: 'spinner/braille',
      cwd,
      outputs: ['css', 'react', 'tailwind'],
      dryRun: true,
    });

    expect(plan.item.name).toBe('Braille Spinner');
    expect(plan.files.map((file) => file.action)).toEqual([
      'create',
      'create',
      'create',
    ]);
    expect(plan.files.map((file) => file.path)).toEqual([
      join(cwd, 'src/styles/glyphe.css'),
      join(cwd, 'src/components/glyphe/SpinnerBrailleAnimation.tsx'),
      join(cwd, 'src/styles/glyphe-tailwind.css'),
    ]);
  });

  it('writes generated files', async () => {
    const cwd = await createFixture();

    await installLocalRegistryItem({
      slug: 'spinner/braille',
      cwd,
      outputs: ['css', 'react', 'tailwind'],
    });

    await expect(
      readFile(join(cwd, 'src/styles/glyphe.css'), 'utf8'),
    ).resolves.toContain('glyphe:start spinner/braille css');
    await expect(
      readFile(
        join(cwd, 'src/components/glyphe/SpinnerBrailleAnimation.tsx'),
        'utf8',
      ),
    ).resolves.toContain('function SpinnerBrailleAnimation');
    await expect(
      readFile(join(cwd, 'src/styles/glyphe-tailwind.css'), 'utf8'),
    ).resolves.toContain('glyphe:start spinner/braille tailwind');
  });

  it('refuses to overwrite unmanaged component files', async () => {
    const cwd = await createFixture();
    const componentPath = join(
      cwd,
      'src/components/glyphe/SpinnerBrailleAnimation.tsx',
    );

    await mkdir(join(cwd, 'src/components/glyphe'), { recursive: true });
    await writeFile(
      componentPath,
      'export function SpinnerBrailleAnimation() {}',
    );

    await expect(
      installLocalRegistryItem({
        slug: 'spinner/braille',
        cwd,
        outputs: ['react'],
      }),
    ).rejects.toThrow('Refusing to overwrite unmanaged files');
  });
});

async function createFixture() {
  const cwd = await mkdtemp(join(tmpdir(), 'glyphe-cli-'));

  return cwd;
}
