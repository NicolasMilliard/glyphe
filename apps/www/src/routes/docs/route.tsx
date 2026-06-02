import { createFileRoute, Outlet } from '@tanstack/react-router';

import { DocsSidebar } from '@/components/docs/docs-sidebar';

export const Route = createFileRoute('/docs')({
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <div className="grid gap-8 px-4 py-6 sm:px-6 sm:py-10 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start md:gap-10 md:py-12">
      <DocsSidebar />
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
