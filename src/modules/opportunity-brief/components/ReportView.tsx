'use client';

import { useState } from 'react';
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
import { encodeBrief } from '../utils/sharing';
import { generateMarkdown } from '../utils/markdown';

interface Props {
  brief: OpportunityBrief;
}

export function ReportView({ brief }: Props) {
  const [isCopying, setIsCopying] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const router = useRouter();

  const handleCopyToClipboard = async () => {
    setIsCopying(true);
    const md = generateMarkdown(brief);
    await navigator.clipboard.writeText(md);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const handleShare = async () => {
    setIsSharing(true);
    const encoded = encodeBrief(brief);
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    await navigator.clipboard.writeText(url);
    setTimeout(() => setIsSharing(false), 2000);
  };

  const handleDownload = () => {
    const md = generateMarkdown(brief);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idea-autopsy-${brief.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-16 bg-white p-8 sm:p-16 shadow-sm dark:bg-zinc-950 dark:shadow-none rounded-2xl border border-zinc-100 dark:border-zinc-900">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.push('/')}
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          ← New Idea
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
          >
            {isSharing ? 'Copied Link!' : 'Share'}
          </button>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
          <button
            onClick={handleCopyToClipboard}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-white text-zinc-600 hover:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-800"
          >
            {isCopying ? 'Copied MD!' : 'Copy MD'}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-white text-zinc-600 hover:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-800"
          >
            Download
          </button>
        </div>
      </div>

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
