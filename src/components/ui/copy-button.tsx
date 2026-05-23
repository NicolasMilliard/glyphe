import { useState } from 'react';
import { cn } from '@/lib/cn';
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
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <Button
      onClick={handleCopy}
      className={cn(
        className,
        copied &&
          'border-accent bg-accent text-accent-foreground ring-ring ring-offset-background shadow-sm ring-2 ring-offset-2',
      )}
      {...props}
    >
      {copied ? copiedLabel : label}
    </Button>
  );
}
