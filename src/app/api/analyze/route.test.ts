import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';
import { generateOpportunityBrief } from '@/modules/analysis-engine/generateBrief';
import { OpportunityBrief } from '@/shared/types';

vi.mock('@/modules/analysis-engine/generateBrief', () => ({
  generateOpportunityBrief: vi.fn(),
}));

describe('POST /api/analyze', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 200 and the brief on valid input', async () => {
    const mockBrief: OpportunityBrief = {
      id: '123',
      inputIdea: 'Valid idea content here',
      createdAt: new Date().toISOString(),
      problemDefinition: {
        coreProblem: 'Test problem',
        painPoint: 'Test pain',
        affectedWorkflows: ['Workflow A'],
        urgency: 'High',
      },
      targetCustomer: {
        segment: 'SaaS companies',
        persona: 'Support Manager',
        environment: 'Cloud',
        buyerVsUser: 'Manager pays, team uses',
      },
      demandSignals: {
        source: 'Qualitative',
        momentumSummary: 'Good momentum',
        signalStrength: 8,
      },
      competitiveLandscape: {
        alternatives: [],
        marketContext: 'Test market',
      },
      mvpScope: {
        coreAction: 'Test action',
        features: ['Feature 1'],
        simplifiedArchitecture: 'Test arch',
        timeToValue: 'Weeks',
      },
      keyRisks: {
        assumptions: [],
        killShot: 'Test kill shot',
      },
      scoring: {
        overallScore: 8,
        dimensions: {
          monetizationPotential: { score: 8, explanation: 'Good' },
          buyerClarity: { score: 8, explanation: 'Good' },
          demandSignal: { score: 8, explanation: 'Good' },
          buildability: { score: 8, explanation: 'Good' },
          competitionDensity: { score: 8, explanation: 'Good' },
        },
        scoreExplanation: 'Great idea.',
      },
      finalVerdict: {
        isPromising: true,
        successConditions: ['Condition 1'],
        firstTest: 'Test 1',
        bottomLine: 'Go for it.',
      },
    };
    vi.mocked(generateOpportunityBrief).mockResolvedValue(mockBrief);

    const req = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ idea: 'A very good and valid startup idea for testing' }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockBrief);
    expect(generateOpportunityBrief).toHaveBeenCalledWith('A very good and valid startup idea for testing');
  });

  it('should return 400 if validation fails', async () => {
    const req = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ idea: 'Too short' }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
    expect(generateOpportunityBrief).not.toHaveBeenCalled();
  });

  it('should return 500 if the analysis engine throws an error', async () => {
    vi.mocked(generateOpportunityBrief).mockRejectedValue(new Error('AI failed'));

    const req = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ idea: 'A very good and valid startup idea for testing' }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Analysis failed');
  });
});
