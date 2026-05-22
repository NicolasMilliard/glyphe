import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { RouteMetadata } from '@/lib/routes';

type RoutePageProps = {
  metadata: RouteMetadata;
  eyebrow?: string;
  children?: ReactNode;
  className?: string;
};

export function RoutePage({
  metadata,
  eyebrow,
  children,
  className,
}: RoutePageProps) {
  return (
    <section className={cn('max-w-3xl', className)}>
      <p className="text-accent mb-4 font-mono text-sm uppercase">
        {eyebrow ?? metadata.label}
      </p>
      <h1 className="text-foreground text-4xl font-semibold sm:text-6xl">
        {metadata.title}
      </h1>
      <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
        {metadata.description}
      </p>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}
