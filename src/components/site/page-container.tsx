import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main
      className={cn(
        'mx-auto w-full max-w-6xl min-w-0 overflow-x-clip px-(--page-gutter) py-(--section-gap)',
        className,
      )}
    >
      {children}
    </main>
  );
}
