import { describe, expect, it } from 'vitest';
import { getFrameInputMode, parseFrames, validateFrameInput } from './frames';

describe('frame parser', () => {
  it('parses whitespace-separated frames', () => {
    expect(parseFrames('⠋ ⠙ ⠹')).toEqual(['⠋', '⠙', '⠹']);
  });

  it('parses newline-separated frames', () => {
    expect(parseFrames('one\ntwo\nthree')).toEqual(['one', 'two', 'three']);
  });

  it('ignores empty whitespace', () => {
    expect(parseFrames('  a   b   c  ')).toEqual(['a', 'b', 'c']);
  });

  it('preserves internal spaces in line-based frames', () => {
    expect(parseFrames('[>    ]\n[=>   ]\n[==>  ]')).toEqual([
      '[>    ]',
      '[=>   ]',
      '[==>  ]',
    ]);
  });

  it('detects the frame input mode', () => {
    expect(getFrameInputMode('a b c')).toBe('space');
    expect(getFrameInputMode('a\nb\nc')).toBe('line');
  });

  it('validates empty frame input', () => {
    expect(
      validateFrameInput({
        value: '   ',
        frames: [],
        duration: 800,
      }),
    ).toContainEqual({
      message: 'Add at least one visible frame.',
      severity: 'error',
    });
  });

  it('warns when space-based input probably contains framed spaces', () => {
    expect(
      validateFrameInput({
        value: '[    ] [=   ]',
        frames: parseFrames('[    ] [=   ]'),
        duration: 800,
      }),
    ).toContainEqual({
      message: 'Frames with internal spaces need one frame per line.',
      severity: 'warning',
    });
  });

  it('warns about very wide frames', () => {
    expect(
      validateFrameInput({
        value: 'abcdefghijklmnopqrstuvwxyz',
        frames: ['abcdefghijklmnopqrstuvwxyz'],
        duration: 800,
      }),
    ).toContainEqual({
      message: 'Very wide frames may overflow compact previews.',
      severity: 'warning',
    });
  });

  it('warns about very fast frame changes', () => {
    expect(
      validateFrameInput({
        value: 'a b c d e',
        frames: ['a', 'b', 'c', 'd', 'e'],
        duration: 200,
      }),
    ).toContainEqual({
      message: 'Very fast frame changes can feel flashy.',
      severity: 'warning',
    });
  });
});
