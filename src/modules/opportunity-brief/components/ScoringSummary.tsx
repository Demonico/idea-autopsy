import { Scoring } from '@/shared/types';

interface Props {
  scoring: Scoring;
}

export function ScoringSummary({ scoring }: Props) {
  return (
    <section className="rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Overall Opportunity Score
        </h2>
        <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          {scoring.overallScore}/10
        </div>
      </div>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        {scoring.scoreExplanation}
      </p>
    </section>
  );
}
