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
          'border-accent bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground ring-ring ring-offset-background shadow-sm ring-2 ring-offset-2',
      )}
      {...props}
    >
      <span
        aria-live="polite"
        className={cn(
          'inline-flex items-center gap-1.5 transition-[filter,opacity] duration-[var(--duration-ui)] ease-[var(--ease-out)]',
          copied && 'opacity-95',
        )}
      >
        {copied ? <CheckIcon /> : null}
        {copied ? copiedLabel : label}
      </span>
    </Button>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      <path d="m5 12 4 4 10-10" />
    </svg>
  );
}
