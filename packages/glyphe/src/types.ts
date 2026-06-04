type RegistryFile = {
  source: string;
  target: string;
  skipIfExists: boolean;
};

export type RegistryComponent = {
  name: string;
  description: string;
  files: RegistryFile[];
  dependencies?: string[];
};

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export type PackageJson = {
  packageManager?: PackageManager;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
};

export type InstallCommand = {
  command: PackageManager;
  args: string[];
};
