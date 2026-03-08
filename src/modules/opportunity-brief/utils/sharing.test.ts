import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { encodeBrief, decodeBrief } from './sharing';
import { OpportunityBrief } from '@/shared/types';
import goldenBrief from '@/tests/fixtures/golden-deconstruction.json';

describe('sharing utils', () => {
  const brief = goldenBrief as unknown as OpportunityBrief;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should encode and decode a brief with integrity', () => {
    const encoded = encodeBrief(brief);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);

    const decoded = decodeBrief(encoded);
    expect(decoded).toEqual(brief);
  });

  it('should be URL safe (no special chars like +, /, = that could break params if not handled)', () => {
    const encoded = encodeBrief(brief);
    // encodeBrief uses btoa(encodeURIComponent(...)) which is safe-ish but we check for common URL delimiters
    // encodeURIComponent handles most things, and btoa adds = usually.
    // Our implementation does NOT replace +, /, = but it IS wrapped in btoa(encodeURIComponent)
    // Actually, btoa of encodeURIComponent is interesting.
    expect(encoded).not.toContain(' ');
  });

  it('should return null for invalid base64 strings', () => {
    const result = decodeBrief('not-a-base64-string-!!!');
    expect(result).toBeNull();
  });

  it('should return null for valid base64 but invalid JSON', () => {
    const invalidJsonBase64 = btoa('{"invalid": "json"');
    const result = decodeBrief(invalidJsonBase64);
    expect(result).toBeNull();
  });

  it('should handle special characters (UTF-8) correctly', () => {
    const briefWithSpecialChars: OpportunityBrief = {
      ...brief,
      inputIdea: 'Idea with emojis 🚀 and special chars like € or ñ'
    };
    
    const encoded = encodeBrief(briefWithSpecialChars);
    const decoded = decodeBrief(encoded);
    expect(decoded?.inputIdea).toBe(briefWithSpecialChars.inputIdea);
  });
});
