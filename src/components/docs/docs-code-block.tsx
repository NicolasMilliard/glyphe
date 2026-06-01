import { CheckIcon, CopyIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ShikiHighlighter, { type ShikiHighlighterProps } from 'react-shiki/web';

import { Button } from '@/components/ui';

type DocsCodeBlockProps = Omit<ShikiHighlighterProps, 'children'> & {
  code: string;
};

function DocsCodeBlock({ code, ...props }: DocsCodeBlockProps) {
  return (
    <div className="relative">
      <ShikiHighlighter {...props}>{code}</ShikiHighlighter>
      <CopyCodeButton text={code} />
    </div>
  );
}

type CopyCodeButtonProps = {
  text: string;
};

function CopyCodeButton({ text }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await copyTextToClipboard(text);
      setCopied(true);

      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={copied ? 'Copied' : 'Copy code'}
      className="absolute top-2 right-2"
      onClick={handleCopy}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.opacity = '0';
  textarea.style.position = 'fixed';

  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export { DocsCodeBlock };
