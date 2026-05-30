import { createFileRoute, Outlet } from '@tanstack/react-router';

import { DocsSidebar } from '@/components/docs/docs-sidebar';

export const Route = createFileRoute('/docs')({
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <div className="grid gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start">
      <DocsSidebar />
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
