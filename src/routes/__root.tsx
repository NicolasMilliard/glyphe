import { createRootRoute } from '@tanstack/react-router';
import { AppLayout } from '@/components/app-layout';
import { RootErrorBoundary, RootNotFound } from '@/components/route-boundaries';

export const Route = createRootRoute({
  component: AppLayout,
  errorComponent: RootErrorBoundary,
  notFoundComponent: RootNotFound,
});
