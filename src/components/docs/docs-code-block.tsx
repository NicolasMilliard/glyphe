import { Text } from '@/components/ui';

type DocsCodeBlockProps = {
  code: string;
  label?: string;
};

function DocsCodeBlock({ code, label }: DocsCodeBlockProps) {
  return (
    <figure className="border-border bg-muted/30 overflow-hidden rounded-xl border">
      {label ? (
        <figcaption className="border-border border-b px-4 py-2">
          <Text intent="caption" tone="muted" weight="medium">
            {label}
          </Text>
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export { DocsCodeBlock };
