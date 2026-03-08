import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { SYSTEM_PROMPT } from './prompts';
import { OpportunityBrief } from '@/shared/types';
import { calculateOverallScore } from '../scoring/score';

// Zod schema matching the OpportunityBrief interface
export const analysisSchema = z.object({
  problemDefinition: z.object({
    coreProblem: z.string().describe('Clinical description of the specific "hair-on-fire" problem.'),
    painPoint: z.string().describe('Why this problem matters and the cost of inaction.'),
    affectedWorkflows: z.array(z.string()).describe('Specific workflows or tasks currently affected by this problem.'),
    urgency: z.enum(['Low', 'Medium', 'High']).describe('Qualitative assessment of the pain level and time sensitivity.'),
  }),
  targetCustomer: z.object({
    segment: z.string().describe('Hyper-specific customer segment (e.g., "SaaS companies with 50-200 employees").'),
    persona: z.string().describe('The specific role or persona facing the problem.'),
    environment: z.string().describe('The software or physical environment where the problem occurs.'),
    buyerVsUser: z.string().describe('Explicitly distinguish between the person who pays and the person who uses the tool.'),
  }),
  demandSignals: z.object({
    source: z.literal('Qualitative').describe('The source of the demand signal assessment.'),
    momentumSummary: z.string().describe('Interpretation of the market interest or "pull" for this solution.'),
    signalStrength: z.number().min(1).max(10).describe('1-10 normalized score for current market demand signals.'),
  }),
  competitiveLandscape: z.object({
    alternatives: z.array(z.object({
      name: z.string().describe('Name of the competitor or manual alternative.'),
      type: z.enum(['SaaS', 'Manual', 'In-house', 'Adjacent']).describe('Category of the alternative.'),
      description: z.string().describe('How the competitor solves the problem or how the "manual status quo" works.'),
    })).describe('Direct and indirect alternatives, including manual processes like Excel.'),
    marketContext: z.string().describe('Overview of the current state of the market and incumbent vulnerability.'),
  }),
  mvpScope: z.object({
    coreAction: z.string().describe('The single most important action a user takes to get value.'),
    features: z.array(z.string()).describe('The absolute minimum feature set required for a 2-week build.'),
    simplifiedArchitecture: z.string().describe('The simplest technical path to first usable value, avoiding complexity.'),
    timeToValue: z.enum(['Days', 'Weeks', 'Months']).describe('Estimated time for a user to see the first value from the MVP.'),
  }),
  keyRisks: z.object({
    assumptions: z.array(z.object({
      assumption: z.string().describe('A critical assumption that must be true for the idea to succeed.'),
      riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The severity of this assumption failing.'),
    })).describe('List of critical business or technical assumptions.'),
    killShot: z.string().describe('The single most dangerous assumption that could invalidate the entire idea.'),
  }),
  scoring: z.object({
    dimensions: z.object({
      demandSignal: z.object({
        score: z.number().min(1).max(10),
        explanation: z.string().describe('Brief, clinical explanation for the Demand Signal score.'),
      }),
      buyerClarity: z.object({
        score: z.number().min(1).max(10),
        explanation: z.string().describe('Brief, clinical explanation for the Buyer Clarity score.'),
      }),
      monetizationPotential: z.object({
        score: z.number().min(1).max(10),
        explanation: z.string().describe('Brief, clinical explanation for the Monetization Potential score.'),
      }),
      competitionDensity: z.object({
        score: z.number().min(1).max(10),
        explanation: z.string().describe('Brief, clinical explanation for the Competition Density score.'),
      }),
      buildability: z.object({
        score: z.number().min(1).max(10),
        explanation: z.string().describe('Brief, clinical explanation for the Buildability score.'),
      }),
    }),
    scoreExplanation: z.string().describe('Overall summary of why the idea received this total score.'),
  }),
  finalVerdict: z.object({
    isPromising: z.boolean().describe('Whether the idea is worth a 2-week sprint/MVP.'),
    successConditions: z.array(z.string()).describe('The specific conditions under which this idea is most likely to succeed.'),
    firstTest: z.string().describe('The simplest experiment to validate the most dangerous assumption (the Kill Shot).'),
    bottomLine: z.string().describe('Concise final summary of the opportunity.'),
  }),
});

export async function generateOpportunityBrief(inputIdea: string): Promise<OpportunityBrief> {
  const { object } = await generateObject({
    model: openai('gpt-5-mini'),
    schema: analysisSchema,
    system: SYSTEM_PROMPT,
    prompt: `Analyze and deconstruct the following startup idea into a clinical, high-value opportunity brief. 

Idea: 
"${inputIdea}"

If the idea is vague, infer the most plausible, high-value B2B or B2C direction. Provide sharp, specific analysis for each section.`,
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
