import { describe, it, expect } from 'vitest';
import { validateIdea } from './validation';

describe('validateIdea', () => {
  it('should return isValid: true for a high-quality startup idea', () => {
    const idea = 'A platform for matching independent designers with sustainable fashion manufacturers.';
    const result = validateIdea(idea);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return an error if the idea is less than 20 characters', () => {
    const result = validateIdea('Too short');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Idea is too short (min 20 characters)');
  });

  it('should return an error if the idea is more than 1000 characters', () => {
    const longIdea = 'a'.repeat(1001);
    const result = validateIdea(longIdea);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Idea is too long (max 1000 characters)');
  });

  it('should return an error if the entry has fewer than 3 words', () => {
    const result = validateIdea('ShortWordCountOnlyHere');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Please provide more than just a few words');
  });

  it('should return an error if the entry has repetitive characters', () => {
    const result = validateIdea('My idea is aaaaaaaaaaaaaaaaaa good one');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Entry seems too repetitive');
  });

  it('should return an error if the entry lacks enough unique characters', () => {
    const result = validateIdea('abababab abababab abababab');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Entry lacks enough meaningful language');
  });

  it('should return an error for keyboard mashing patterns', () => {
    const result = validateIdea('asdfghjkl asdfghjkl asdfghjkl');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Entry seems to be random keyboard characters');
  });
});
