export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-3 px-(--page-gutter) py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>Terminal-inspired motion primitives for the web.</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href="https://github.com/NicolasMilliard/glyphe"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Glyphe on GitHub"
            className="glyphe-pressable hover:text-foreground rounded-glyphe-md inline-flex size-9 items-center justify-center"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.86 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9v2.79c0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <p className="font-mono text-xs uppercase">
            CSS-first · Ownable code
          </p>
        </div>
      </div>
    </footer>
  );
}
