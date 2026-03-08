'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OpportunityBrief } from '@/shared/types';

export default function ReportPage() {
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
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-zinc-500">Loading analysis...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-6 font-sans dark:bg-black">
      <div className="mx-auto max-w-3xl space-y-12 bg-white p-12 shadow-sm dark:bg-zinc-950 dark:shadow-none">
        {/* Header */}
        <header className="border-b border-zinc-100 pb-8 dark:border-zinc-800">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Opportunity Brief
          </h1>
          <p className="mt-4 italic text-zinc-600 dark:text-zinc-400">
            "{brief.inputIdea}"
          </p>
          <div className="mt-4 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-600">
            <span>ID: {brief.id}</span>
            <span>{new Date(brief.createdAt).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Scoring Summary (Slice 1 Placeholder) */}
        <section className="rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Overall Opportunity Score
            </h2>
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              {brief.scoring.overallScore}/10
            </div>
          </div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {brief.scoring.scoreExplanation}
          </p>
        </section>

        {/* Problem Definition */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Problem Definition
          </h2>
          <div className="space-y-2">
            <p className="text-zinc-800 dark:text-zinc-200">
              <span className="font-semibold">Core Problem:</span> {brief.problemDefinition.coreProblem}
            </p>
            <p className="text-zinc-800 dark:text-zinc-200">
              <span className="font-semibold">Pain Point:</span> {brief.problemDefinition.painPoint}
            </p>
            <div>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Affected Workflows:</span>
              <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-700 dark:text-zinc-300">
                {brief.problemDefinition.affectedWorkflows.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Target Customer */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Target Customer
          </h2>
          <div className="grid grid-cols-2 gap-4 text-zinc-800 dark:text-zinc-200">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Segment</p>
              <p>{brief.targetCustomer.segment}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Persona</p>
              <p>{brief.targetCustomer.persona}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Environment</p>
              <p>{brief.targetCustomer.environment}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Buyer vs User</p>
              <p>{brief.targetCustomer.buyerVsUser}</p>
            </div>
          </div>
        </section>

        {/* MVP Scope */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            MVP Scope
          </h2>
          <div className="space-y-4">
            <div className="rounded border border-zinc-100 p-4 dark:border-zinc-800">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Core Action</p>
              <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{brief.mvpScope.coreAction}</p>
            </div>
            <div>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Features:</span>
              <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-700 dark:text-zinc-300">
                {brief.mvpScope.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <p className="text-zinc-800 dark:text-zinc-200">
              <span className="font-semibold">Architecture:</span> {brief.mvpScope.simplifiedArchitecture}
            </p>
          </div>
        </section>

        {/* Competitive Landscape */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Competitive Landscape
          </h2>
          <div className="space-y-4">
            <p className="text-zinc-700 dark:text-zinc-300">{brief.competitiveLandscape.marketContext}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {brief.competitiveLandscape.alternatives.map((alt, i) => (
                <div key={i} className="rounded border border-zinc-100 p-3 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{alt.name}</span>
                    <span className="text-[10px] font-bold uppercase text-zinc-500">{alt.type}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{alt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Risks */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 text-red-700">
            Key Risks & Kill Shot
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-red-100 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
              <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">The Kill Shot</p>
              <p className="mt-1 font-bold text-red-900 dark:text-red-100">{brief.keyRisks.killShot}</p>
            </div>
            <div>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Assumptions:</span>
              <div className="mt-2 space-y-2">
                {brief.keyRisks.assumptions.map((a, i) => (
                  <div key={i} className="flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                    <span>{a.assumption}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      a.riskLevel === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' :
                      a.riskLevel === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100' :
                      'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
                    }`}>{a.riskLevel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="border-t border-zinc-100 pt-8 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Final Verdict
          </h2>
          <div className="mt-4 space-y-4 text-zinc-800 dark:text-zinc-200">
            <p className="text-lg leading-relaxed">{brief.finalVerdict.bottomLine}</p>
            <div>
              <p className="font-bold">Success Conditions:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                {brief.finalVerdict.successConditions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded bg-zinc-900 p-4 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
              <p className="text-xs font-bold uppercase tracking-wider opacity-60">First thing to test</p>
              <p className="mt-1 font-medium">{brief.finalVerdict.firstTest}</p>
            </div>
          </div>
        </section>

        <footer className="text-center pt-12 border-t border-zinc-50 dark:border-zinc-900">
          <button 
            onClick={() => router.push('/')}
            className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            ← Analyze another idea
          </button>
        </footer>
      </div>
    </div>
  );
}
