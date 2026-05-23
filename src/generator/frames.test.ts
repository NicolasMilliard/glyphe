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
    expect(parseFrames('  a   b\n\nc  ')).toEqual(['a', 'b', 'c']);
  });
});
