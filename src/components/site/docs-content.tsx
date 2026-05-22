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
        'text-muted-foreground [&_a]:text-accent [&_h1]:text-foreground [&_h2]:text-foreground max-w-3xl text-base leading-8 [&_h1]:mb-6 [&_h1]:text-4xl [&_h1]:font-semibold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_p]:my-5',
        className,
      )}
    >
      {children}
    </article>
  );
}
