export type SiteNavItem = {
  label: string;
  to: string;
};

export const siteNavItems = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Generator', to: '/generator' },
  { label: 'Examples', to: '/examples' },
  { label: 'Registry', to: '/registry' },
  { label: 'Docs', to: '/docs' },
] satisfies SiteNavItem[];
