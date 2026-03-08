import { NextRequest, NextResponse } from 'next/server';
import { generateOpportunityBrief } from '@/modules/analysis-engine/generateBrief';
import { validateIdea } from '@/shared/utils/validation';

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    const { isValid, error } = validateIdea(idea || '');
    if (!isValid) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const brief = await generateOpportunityBrief(idea);

    return NextResponse.json(brief);
  } catch (error) {
    console.error('Analysis failed:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
