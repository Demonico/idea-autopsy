'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OpportunityBrief } from '@/shared/types';
import { ReportHeader } from './ReportHeader';
import { ScoringSummary } from './ScoringSummary';
import { ProblemSection } from './ProblemSection';
import { CustomerSection } from './CustomerSection';
import { MVPSection } from './MVPSection';
import { CompetitionSection } from './CompetitionSection';
import { RiskSection } from './RiskSection';
import { VerdictSection } from './VerdictSection';

export function ReportView() {
  const [brief, setBrief] = useState<OpportunityBrief | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('last_brief');
    if (stored) {
      try {
        setBrief(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse brief:', err);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  if (!brief) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-zinc-500 animate-pulse">Loading analysis...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-16 bg-white p-8 sm:p-16 shadow-sm dark:bg-zinc-950 dark:shadow-none rounded-2xl border border-zinc-100 dark:border-zinc-900">
      <ReportHeader id={brief.id} inputIdea={brief.inputIdea} createdAt={brief.createdAt} />
      <ScoringSummary scoring={brief.scoring} />
      <ProblemSection problemDefinition={brief.problemDefinition} />
      <CustomerSection targetCustomer={brief.targetCustomer} />
      <MVPSection mvpScope={brief.mvpScope} />
      <CompetitionSection competitiveLandscape={brief.competitiveLandscape} />
      <RiskSection keyRisks={brief.keyRisks} />
      <VerdictSection finalVerdict={brief.finalVerdict} />

      <footer className="text-center pt-12 border-t border-zinc-50 dark:border-zinc-900">
        <button 
          onClick={() => router.push('/')}
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          ← Analyze another idea
        </button>
      </footer>
    </div>
  );
}
