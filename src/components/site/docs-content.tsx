import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type DocsContentProps = {
  children: ReactNode;
  className?: string;
};

export function DocsContent({ children, className }: DocsContentProps) {
  return (
    <article
      className={cn(
        'text-muted-foreground [&_a]:text-accent [&_code]:bg-surface [&_code]:text-foreground [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground max-w-3xl text-base leading-8 [&_code]:rounded-sm [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_h1]:mb-6 [&_h1]:text-4xl [&_h1]:font-semibold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:my-2 [&_p]:my-5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6',
        className,
      )}
    >
      {children}
    </article>
  );
}
