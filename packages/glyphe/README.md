# Glyphe

Open-code typography primitives for React interfaces.

This package will provide the `glyphe` CLI. The first target command is:

```sh
bunx glyphe@latest add text
```

The command copies the `Text` primitive source into the current project:

```txt
src/components/ui/text.tsx
src/lib/cn.ts
```

Existing files are skipped by default. The generated `cn` helper uses:

```sh
bun add clsx tailwind-merge
```
