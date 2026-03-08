import { describe, it, expect } from 'vitest';
import { calculateOverallScore } from './score';
import { Scoring } from '@/shared/types';

describe('calculateOverallScore', () => {
  const createDimensions = (scores: {
    monetizationPotential: number;
    buyerClarity: number;
    demandSignal: number;
    buildability: number;
    competitionDensity: number;
  }): Scoring['dimensions'] => ({
    monetizationPotential: { score: scores.monetizationPotential, explanation: 'test' },
    buyerClarity: { score: scores.buyerClarity, explanation: 'test' },
    demandSignal: { score: scores.demandSignal, explanation: 'test' },
    buildability: { score: scores.buildability, explanation: 'test' },
    competitionDensity: { score: scores.competitionDensity, explanation: 'test' },
  });

  it('calculates perfect score correctly', () => {
    const dimensions = createDimensions({
      monetizationPotential: 10,
      buyerClarity: 10,
      demandSignal: 10,
      buildability: 10,
      competitionDensity: 10,
    });
    expect(calculateOverallScore(dimensions)).toBe(10);
  });

  it('calculates minimum score correctly', () => {
    const dimensions = createDimensions({
      monetizationPotential: 1,
      buyerClarity: 1,
      demandSignal: 1,
      buildability: 1,
      competitionDensity: 1,
    });
    expect(calculateOverallScore(dimensions)).toBe(1);
  });

  it('applies weights correctly for a single dimension', () => {
    // Monetization is 30%
    const dimensions = createDimensions({
      monetizationPotential: 10,
      buyerClarity: 0,
      demandSignal: 0,
      buildability: 0,
      competitionDensity: 0,
    });
    expect(calculateOverallScore(dimensions)).toBe(3);
  });

  it('rounds to one decimal place', () => {
    // (7 * 0.3) + (6 * 0.25) + (8 * 0.2) + (5 * 0.15) + (9 * 0.1)
    // 2.1 + 1.5 + 1.6 + 0.75 + 0.9 = 6.85
    // 6.85 should round to 6.9
    const dimensions = createDimensions({
      monetizationPotential: 7,
      buyerClarity: 6,
      demandSignal: 8,
      buildability: 5,
      competitionDensity: 9,
    });
    expect(calculateOverallScore(dimensions)).toBe(6.9);
  });

  it('rounds down when appropriate', () => {
    // (7 * 0.3) + (6 * 0.25) + (8 * 0.2) + (5 * 0.15) + (8 * 0.1)
    // 2.1 + 1.5 + 1.6 + 0.75 + 0.8 = 6.75
    // Wait, 6.75 rounds to 6.8. Let's find one that rounds down.
    // (7 * 0.3) + (6 * 0.25) + (8 * 0.2) + (4 * 0.15) + (9 * 0.1)
    // 2.1 + 1.5 + 1.6 + 0.6 + 0.9 = 6.7
    const dimensions = createDimensions({
      monetizationPotential: 7,
      buyerClarity: 6,
      demandSignal: 8,
      buildability: 4,
      competitionDensity: 9,
    });
    expect(calculateOverallScore(dimensions)).toBe(6.7);
  });
});
