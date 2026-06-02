import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn('mx-auto w-full max-w-5xl min-w-0 pt-19', className)}>
      {children}
    </main>
  );
}
