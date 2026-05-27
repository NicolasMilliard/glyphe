import { Text, TextLink } from '../ui';

export function SiteFooter() {
  return (
    <footer className="border-muted border-t">
      <div className="mx-auto w-full max-w-5xl py-6">
        <Text className="text-muted-foreground text-center">
          Built by{' '}
          <TextLink
            tone="muted"
            href="https://github.com/NicolasMilliard"
            external
            aria-label="Open Nicolas Milliard profile on GitHub"
          >
            Nicolas Milliard
          </TextLink>
          . The source code is available on{' '}
          <TextLink
            tone="muted"
            href="https://github.com/NicolasMilliard/glyphe"
            external
            aria-label="Open Glyphe on GitHub"
          >
            GitHub
          </TextLink>
          .
        </Text>
      </div>
    </footer>
  );
}
