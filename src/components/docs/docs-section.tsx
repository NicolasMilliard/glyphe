import type { ReactNode } from 'react';

import { Text } from '@/components/ui';

type DocsSectionProps = {
  children: ReactNode;
  description?: ReactNode;
  id: string;
  title: string;
};

function DocsSection({ children, description, id, title }: DocsSectionProps) {
  return (
    <section id={id} className="space-y-6" aria-labelledby={`${id}-title`}>
      <div className="space-y-3">
        <Text id={`${id}-title`} intent="h2">
          {title}
        </Text>
        {description ? (
          <Text intent="paragraph" measure="readable">
            {description}
          </Text>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export { DocsSection };
