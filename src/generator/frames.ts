export function parseFrames(value: string) {
  if (value.includes('\n')) {
    return value
      .split(/\r?\n/)
      .map((frame) => frame.trimEnd())
      .filter((frame) => frame.trim().length > 0);
  }

  return value
    .split(/\s+/)
    .map((frame) => frame.trim())
    .filter(Boolean);
}
