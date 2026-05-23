export type RouteMetadata = {
  path: string;
  label: string;
  title: string;
  description: string;
  parent?: string;
};

export type BreadcrumbItem = {
  label: string;
  path: string;
};

export const routeMetadata = {
  home: {
    path: '/',
    label: 'Home',
    title: 'Glyphe',
    description:
      'A registry-first, CSS-first toolkit for terminal-inspired text animations on the web.',
  },
  gallery: {
    path: '/gallery',
    label: 'Gallery',
    title: 'Gallery',
    description: 'Browse terminal-inspired animation primitives.',
    parent: '/',
  },
  animationDetail: {
    path: '/gallery/$slug',
    label: 'Animation',
    title: 'Animation Detail',
    description: 'Preview animation output, accessibility notes, and code.',
    parent: '/gallery',
  },
  generator: {
    path: '/generator',
    label: 'Generator',
    title: 'Generator',
    description: 'Create custom frame animations and export code.',
    parent: '/',
  },
  docs: {
    path: '/docs',
    label: 'Docs',
    title: 'Documentation',
    description: 'Learn how Glyphe is structured and how generated code works.',
    parent: '/',
  },
  registry: {
    path: '/registry',
    label: 'Registry',
    title: 'Registry',
    description: 'Explore the registry model that powers Glyphe animations.',
    parent: '/',
  },
  examples: {
    path: '/examples',
    label: 'Examples',
    title: 'Examples',
    description: 'See common ways to use Glyphe primitives in interfaces.',
    parent: '/',
  },
} satisfies Record<string, RouteMetadata>;

const metadataByPath = Object.values(routeMetadata).reduce<
  Record<string, RouteMetadata>
>((items, route) => {
  items[route.path] = route;
  return items;
}, {});

export function getRouteMetadata(path: string) {
  return metadataByPath[path];
}

export function getBreadcrumbs(path: string): BreadcrumbItem[] {
  const route = getRouteMetadata(path);

  if (!route) {
    return [{ label: routeMetadata.home.label, path: routeMetadata.home.path }];
  }

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentRoute: RouteMetadata | undefined = route;

  while (currentRoute) {
    breadcrumbs.unshift({
      label: currentRoute.label,
      path: currentRoute.path,
    });

    currentRoute = currentRoute.parent
      ? getRouteMetadata(currentRoute.parent)
      : undefined;
  }

  return breadcrumbs;
}
