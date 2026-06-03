# Glyphe

Open-code typography primitives for React interfaces.

This package will provide the `glyphe` CLI. The first target command is:

```sh
bunx glyphe@latest add text
```

The command copies the `Text` primitive source into the current project:

```txt
src/components/ui/text.tsx
```

Existing files are skipped by default. The generated `Text` primitive has no
runtime dependencies beyond React.
