import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { SYSTEM_PROMPT } from './prompts';
import { OpportunityBrief } from '@/shared/types';
import { calculateOverallScore } from '../scoring/score';

// Zod schema matching the OpportunityBrief interface
const analysisSchema = z.object({
  problemDefinition: z.object({
    coreProblem: z.string(),
    painPoint: z.string(),
    affectedWorkflows: z.array(z.string()),
    urgency: z.enum(['Low', 'Medium', 'High']),
  }),
  targetCustomer: z.object({
    segment: z.string(),
    persona: z.string(),
    environment: z.string(),
    buyerVsUser: z.string(),
  }),
  demandSignals: z.object({
    source: z.literal('Qualitative'),
    momentumSummary: z.string(),
    signalStrength: z.number().min(1).max(10),
  }),
  competitiveLandscape: z.object({
    alternatives: z.array(z.object({
      name: z.string(),
      type: z.enum(['SaaS', 'Manual', 'In-house', 'Adjacent']),
      description: z.string(),
    })),
    marketContext: z.string(),
  }),
  mvpScope: z.object({
    coreAction: z.string(),
    features: z.array(z.string()),
    simplifiedArchitecture: z.string(),
    timeToValue: z.enum(['Days', 'Weeks', 'Months']),
  }),
  keyRisks: z.object({
    assumptions: z.array(z.object({
      assumption: z.string(),
      riskLevel: z.enum(['Low', 'Medium', 'High']),
    })),
    killShot: z.string(),
  }),
  scoring: z.object({
    dimensions: z.object({
      demandSignal: z.object({ score: z.number().min(1).max(10), explanation: z.string() }),
      buyerClarity: z.object({ score: z.number().min(1).max(10), explanation: z.string() }),
      monetizationPotential: z.object({ score: z.number().min(1).max(10), explanation: z.string() }),
      competitionDensity: z.object({ score: z.number().min(1).max(10), explanation: z.string() }),
      buildability: z.object({ score: z.number().min(1).max(10), explanation: z.string() }),
    }),
    scoreExplanation: z.string(),
  }),
  finalVerdict: z.object({
    isPromising: z.boolean(),
    successConditions: z.array(z.string()),
    firstTest: z.string(),
    bottomLine: z.string(),
  }),
});

export async function generateOpportunityBrief(inputIdea: string): Promise<OpportunityBrief> {
  const { object } = await generateObject({
    model: openai('gpt-5-mini'),
    schema: analysisSchema,
    system: SYSTEM_PROMPT,
    prompt: `Deconstruct this startup idea: ${inputIdea}`,
  });

  const overallScore = calculateOverallScore(object.scoring.dimensions);

  return {
    id: crypto.randomUUID(),
    inputIdea,
    createdAt: new Date().toISOString(),
    ...object,
    scoring: {
      ...object.scoring,
      overallScore,
    },
  };
}
