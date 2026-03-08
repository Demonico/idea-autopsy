'use client';

import { validateIdea } from '@/shared/utils/validation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { encodeBrief } from '@/modules/opportunity-brief/utils/sharing';

const LOADING_MESSAGES = [
  "Deconstructing idea...",
  "Scanning market signals...",
  "Analyzing risks and ROI...",
  "Finalizing report...",
];

export function IdeaInputForm() {
  const [ idea, setIdea ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ loadingMessageIndex, setLoadingMessageIndex ] = useState(0);
  const [ error, setError ] = useState('');
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    } else {
      setLoadingMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAnalyze = async () => {
    const { isValid, error: validationError } = validateIdea(idea);
    if (!isValid) {
      setError(validationError || 'Invalid idea');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to analyze idea');
      }

      const brief = await response.json();

      // Navigate with encoded data (stateless sharing)
      const encoded = encodeBrief(brief);
      router.push(`/report?data=${encoded}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
          <div className="space-y-4">
      <textarea
              className="w-full min-h-50 rounded-xl border border-zinc-200 bg-white p-4 text-lg text-zinc-900 shadow-sm transition-colors focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-700"
              placeholder="Describe your startup idea or a problem you want to solve..."
              value={ idea }
              onChange={ (e) => setIdea(e.target.value) }
              disabled={ isLoading }
      />

            { error && (
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                      { error }
                    </p>
            ) }

            <button
                    className="w-full rounded-full bg-zinc-900 px-8 py-4 text-lg font-medium text-zinc-50 transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    onClick={ handleAnalyze }
                    disabled={ isLoading || idea.trim().length < 20 }
            >
              { isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  { LOADING_MESSAGES[loadingMessageIndex] }
                </span>
              ) : 'Analyze Idea' }
            </button>
          </div>
  );
}
