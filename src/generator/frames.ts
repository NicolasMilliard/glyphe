export function parseFrames(value: string) {
  return value
    .split(/\s+/)
    .map((frame) => frame.trim())
    .filter(Boolean);
}
