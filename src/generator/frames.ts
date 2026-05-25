export type FrameValidationMessage = {
  message: string;
  severity: 'error' | 'warning';
};

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
  const messages: FrameValidationMessage[] = [];
  const maxFrameWidth = Math.max(
    ...frames.map((frame) => Array.from(frame).length),
    0,
  );
  const frameDuration = frames.length > 0 ? duration / frames.length : duration;

  if (value.trim().length === 0 || frames.length === 0) {
    messages.push({
      message: 'Add at least one visible frame.',
      severity: 'error',
    });
  }

  if (getFrameInputMode(value) === 'space' && /\S\s{2,}\S/.test(value.trim())) {
    messages.push({
      message: 'Frames with internal spaces need one frame per line.',
      severity: 'warning',
    });
  }

  if (!Number.isFinite(duration) || duration < 100) {
    messages.push({
      message: 'Duration should be at least 100ms.',
      severity: 'error',
    });
  }

  if (maxFrameWidth > 24) {
    messages.push({
      message: 'Very wide frames may overflow compact previews.',
      severity: 'warning',
    });
  }

  if (frames.length > 1 && frameDuration < 80) {
    messages.push({
      message: 'Very fast frame changes can feel flashy.',
      severity: 'warning',
    });
  }

  if (new Set(frames).size !== frames.length) {
    messages.push({
      message: 'Duplicate frames are allowed, but may make motion unclear.',
      severity: 'warning',
    });
  }

  return messages;
}
