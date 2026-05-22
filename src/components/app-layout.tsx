import { Outlet } from '@tanstack/react-router';
import { PageContainer } from './site/page-container';
import { SiteFooter } from './site/site-footer';
import { SiteHeader } from './site/site-header';

export function AppLayout() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <SiteHeader />
      <PageContainer className="flex-1">
        <Outlet />
      </PageContainer>
      <SiteFooter />
    </div>
  );
}
