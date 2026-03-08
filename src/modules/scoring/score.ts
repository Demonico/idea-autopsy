import { Scoring } from '@/shared/types';

export const SCORING_WEIGHTS = {
  monetizationPotential: 0.30,
  buyerClarity: 0.25,
  demandSignal: 0.20,
  buildability: 0.15,
  competitionDensity: 0.10,
} as const;

export function calculateOverallScore(dimensions: Scoring['dimensions']): number {
  const score =
    dimensions.monetizationPotential.score * SCORING_WEIGHTS.monetizationPotential +
    dimensions.buyerClarity.score * SCORING_WEIGHTS.buyerClarity +
    dimensions.demandSignal.score * SCORING_WEIGHTS.demandSignal +
    dimensions.buildability.score * SCORING_WEIGHTS.buildability +
    dimensions.competitionDensity.score * SCORING_WEIGHTS.competitionDensity;

  // Round to one decimal place as per spec
  return Math.round(score * 10) / 10;
}
