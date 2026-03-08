import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateOpportunityBrief, analysisSchema } from './generateBrief';
import { generateObject, GenerateObjectResult } from 'ai';
import { SYSTEM_PROMPT } from './prompts';

vi.mock('ai', () => ({
  generateObject: vi.fn(),
}));

// Mocking OpenAI model directly to avoid real API calls
vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn().mockReturnValue({ modelId: 'gpt-5-mini' }),
}));

describe('generateOpportunityBrief', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls generateObject with the correct prompt, schema, and system instruction', async () => {
    const mockOutput = {
      problemDefinition: {
        coreProblem: 'Mock problem',
        painPoint: 'Mock pain',
        affectedWorkflows: ['Mock workflow'],
        urgency: 'High',
      },
      targetCustomer: {
        segment: 'Mock segment',
        persona: 'Mock persona',
        environment: 'Mock env',
        buyerVsUser: 'Mock buyer',
      },
      demandSignals: {
        source: 'Qualitative',
        momentumSummary: 'Mock momentum',
        signalStrength: 7,
      },
      competitiveLandscape: {
        alternatives: [],
        marketContext: 'Mock market',
      },
      mvpScope: {
        coreAction: 'Mock action',
        features: ['Mock feature'],
        simplifiedArchitecture: 'Mock arch',
        timeToValue: 'Weeks',
      },
      keyRisks: {
        assumptions: [],
        killShot: 'Mock kill shot',
      },
      scoring: {
        dimensions: {
          demandSignal: { score: 7, explanation: 'Good' },
          buyerClarity: { score: 7, explanation: 'Good' },
          monetizationPotential: { score: 7, explanation: 'Good' },
          competitionDensity: { score: 7, explanation: 'Good' },
          buildability: { score: 7, explanation: 'Good' },
        },
        scoreExplanation: 'Mock explanation',
      },
      finalVerdict: {
        isPromising: true,
        successConditions: [],
        firstTest: 'Mock test',
        bottomLine: 'Mock bottom line',
      },
    };

    vi.mocked(generateObject).mockResolvedValue({
      object: mockOutput,
    } as GenerateObjectResult<typeof mockOutput>);

    const inputIdea = 'An idea for a new startup';
    await generateOpportunityBrief(inputIdea);

    expect(generateObject).toHaveBeenCalledWith(
      expect.objectContaining({
        schema: analysisSchema,
        system: SYSTEM_PROMPT,
        prompt: expect.stringContaining(inputIdea),
      })
    );
  });

  it('correctly calculates the overall score for the brief', async () => {
    const mockOutput = {
      scoring: {
        dimensions: {
          monetizationPotential: { score: 10, explanation: '' },
          buyerClarity: { score: 10, explanation: '' },
          demandSignal: { score: 10, explanation: '' },
          buildability: { score: 10, explanation: '' },
          competitionDensity: { score: 10, explanation: '' },
        },
      },
      // ... include minimal other required fields to avoid validation errors if any (though we are mocking the return)
    };

    vi.mocked(generateObject).mockResolvedValue({
      object: mockOutput,
    } as GenerateObjectResult<typeof mockOutput>);

    const result = await generateOpportunityBrief('Test idea');
    expect(result.scoring.overallScore).toBe(10);
  });
});
