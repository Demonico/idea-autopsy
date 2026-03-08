import { describe, it, expect } from 'vitest';
import { calculateOverallScore, SCORING_WEIGHTS } from './score';
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
    const dimensions = createDimensions({
      monetizationPotential: 10,
      buyerClarity: 0,
      demandSignal: 0,
      buildability: 0,
      competitionDensity: 0,
    });
    expect(calculateOverallScore(dimensions)).toBe(10 * SCORING_WEIGHTS.monetizationPotential);
  });

  it('handles "Competition Density" inversion: high score means low competition (advantageous)', () => {
    // 10/10 in competition density means NO competition (good for the overall score)
    const lowCompetition = createDimensions({
      monetizationPotential: 5,
      buyerClarity: 5,
      demandSignal: 5,
      buildability: 5,
      competitionDensity: 10,
    });
    
    // 1/10 in competition density means HYPER competition (bad for the overall score)
    const highCompetition = createDimensions({
      monetizationPotential: 5,
      buyerClarity: 5,
      demandSignal: 5,
      buildability: 5,
      competitionDensity: 1,
    });

    expect(calculateOverallScore(lowCompetition)).toBeGreaterThan(calculateOverallScore(highCompetition));
  });

  it('rounds to one decimal place', () => {
    // Using scores that result in multiple decimal places
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

  it('rounds correctly when weights or scores change', () => {
    // Test a specific case that should round to exactly one decimal
    // If weights were changed, this would still test the rounding logic itself
    const dimensions = createDimensions({
      monetizationPotential: 7.2,
      buyerClarity: 6.1,
      demandSignal: 8.3,
      buildability: 4.4,
      competitionDensity: 9.5,
    });
    const score = calculateOverallScore(dimensions);
    const decimalCount = score.toString().split('.')[1]?.length || 0;
    expect(decimalCount).toBeLessThanOrEqual(1);
  });
});
