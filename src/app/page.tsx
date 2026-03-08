'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAnalyze = async () => {
    if (idea.length < 20) {
      setError('Idea is too short (min 20 characters)');
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
      
      // For Slice 1, we'll store in sessionStorage and navigate
      sessionStorage.setItem('last_brief', JSON.stringify(brief));
      router.push('/report');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 font-sans dark:bg-black">
      <main className="w-full max-w-2xl space-y-8 text-center">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Idea Autopsy
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Deconstruct your startup idea like a skeptical investor.
          </p>
        </header>

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
            disabled={isLoading || idea.length < 20}
          >
            {isLoading ? 'Analyzing Idea...' : 'Analyze Idea'}
          </button>
        </div>

        <footer className="pt-8 text-sm text-zinc-500 dark:text-zinc-600">
          Vertical Slice 1: Basic Analysis Brief
        </footer>
      </main>
    </div>
  );
}
