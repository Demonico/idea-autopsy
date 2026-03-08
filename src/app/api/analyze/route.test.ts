import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';
import { generateOpportunityBrief } from '@/modules/analysis-engine/generateBrief';

vi.mock('@/modules/analysis-engine/generateBrief', () => ({
  generateOpportunityBrief: vi.fn(),
}));

describe('POST /api/analyze', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 200 and the brief on valid input', async () => {
    const mockBrief = { id: '123', inputIdea: 'Valid idea content here', scoring: { overallScore: 8 } };
    vi.mocked(generateOpportunityBrief).mockResolvedValue(mockBrief as any);

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
