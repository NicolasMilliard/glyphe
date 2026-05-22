import { useState } from 'react';
import { Button } from './button';
import type { ButtonHTMLAttributes } from 'react';

type CopyButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'onClick'
> & {
  value: string;
  label?: string;
  copiedLabel?: string;
};

export function CopyButton({
  value,
  label = 'Copy',
  copiedLabel = 'Copied',
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <Button onClick={handleCopy} {...props}>
      {copied ? copiedLabel : label}
    </Button>
  );
}
