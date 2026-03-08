import { NextRequest, NextResponse } from 'next/server';
import { generateOpportunityBrief } from '@/modules/analysis-engine/generateBrief';

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea || typeof idea !== 'string') {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    if (idea.length < 20) {
      return NextResponse.json({ error: 'Idea is too short (min 20 characters)' }, { status: 400 });
    }

    if (idea.length > 1000) {
      return NextResponse.json({ error: 'Idea is too long (max 1000 characters)' }, { status: 400 });
    }

    const brief = await generateOpportunityBrief(idea);

    return NextResponse.json(brief);
  } catch (error) {
    console.error('Analysis failed:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
