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

export function getFrameInputMode(value: string) {
  return value.includes('\n') ? 'line' : 'space';
}

export function validateFrameInput({
  value,
  frames,
  duration,
}: {
  value: string;
  frames: string[];
  duration: number;
}) {
  const messages: string[] = [];
  const maxFrameWidth = Math.max(
    ...frames.map((frame) => Array.from(frame).length),
    0,
  );
  const frameDuration = frames.length > 0 ? duration / frames.length : duration;

  if (value.trim().length === 0 || frames.length === 0) {
    messages.push('Add at least one visible frame.');
  }

  if (getFrameInputMode(value) === 'space' && /\S\s{2,}\S/.test(value.trim())) {
    messages.push('Frames with internal spaces need one frame per line.');
  }

  if (!Number.isFinite(duration) || duration < 100) {
    messages.push('Duration should be at least 100ms.');
  }

  if (maxFrameWidth > 24) {
    messages.push('Very wide frames may overflow compact previews.');
  }

  if (frames.length > 1 && frameDuration < 80) {
    messages.push('Very fast frame changes can feel flashy.');
  }

  if (new Set(frames).size !== frames.length) {
    messages.push('Duplicate frames are allowed, but may make motion unclear.');
  }

  return messages;
}
