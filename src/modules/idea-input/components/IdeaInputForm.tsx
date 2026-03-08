'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateIdea } from '@/shared/utils/validation';

export function IdeaInputForm() {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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
      
      // Store in sessionStorage and navigate
      sessionStorage.setItem('last_brief', JSON.stringify(brief));
      router.push('/report');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full min-h-[200px] rounded-xl border border-zinc-200 bg-white p-4 text-lg text-zinc-900 shadow-sm transition-colors focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-700"
        placeholder="Describe your startup idea or a problem you want to solve..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        disabled={isLoading}
      />
      
      {error && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <button
        className="w-full rounded-full bg-zinc-900 px-8 py-4 text-lg font-medium text-zinc-50 transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        onClick={handleAnalyze}
        disabled={isLoading || idea.trim().length < 20}
      >
        {isLoading ? 'Analyzing Idea...' : 'Analyze Idea'}
      </button>
    </div>
  );
}
