import { Scoring } from '@/shared/types';
import { SCORING_WEIGHTS } from './weights';

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
