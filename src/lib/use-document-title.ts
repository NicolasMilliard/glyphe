import { useEffect } from 'react';
import { siteConfig } from '@/lib/site';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} - ${siteConfig.name}` : siteConfig.title;
  }, [title]);
}
