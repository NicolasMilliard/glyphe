import { describe, expect, it } from 'vitest';
import { parseFrames } from './frames';

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
});
