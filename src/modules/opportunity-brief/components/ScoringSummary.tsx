import { Scoring, ScoreDimension } from '@/shared/types';

interface Props {
  scoring: Scoring;
}

const DIMENSION_CONFIG: Record<keyof Scoring['dimensions'], { label: string; description: string }> = {
  monetizationPotential: {
    label: 'Monetization Potential',
    description: 'Realism of value exchange and revenue generation.',
  },
  buyerClarity: {
    label: 'Buyer Clarity',
    description: 'Specificity of the target customer segment and persona.',
  },
  demandSignal: {
    label: 'Demand Signal',
    description: 'Evidence of broader market interest and momentum.',
  },
  buildability: {
    label: 'Buildability',
    description: 'Complexity of building a viable MVP quickly.',
  },
  competitionDensity: {
    label: 'Competition Density',
    description: 'Crowdedness of the market and differentiation potential.',
  },
};

export function ScoringSummary({ scoring }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 5) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  const getBarColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-500';
    if (score >= 5) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <section className="space-y-8 rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Opportunity Scorecard
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Weighted analysis across core venture dimensions
          </p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-black tabular-nums ${getScoreColor(scoring.overallScore)}`}>
            {scoring.overallScore}
          </span>
          <span className="text-xl font-medium text-zinc-400">/ 10</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {(Object.entries(DIMENSION_CONFIG) as [keyof Scoring['dimensions'], typeof DIMENSION_CONFIG.monetizationPotential][]).map(([key, config]) => {
          const dimension = scoring.dimensions[key];
          return (
            <div key={key} className="group space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                    {config.label}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {config.description}
                  </p>
                </div>
                <span className={`text-lg font-bold tabular-nums ${getScoreColor(dimension.score)}`}>
                  {dimension.score}/10
                </span>
              </div>
              
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div 
                  className={`absolute h-full rounded-full transition-all duration-500 ${getBarColor(dimension.score)}`}
                  style={{ width: `${dimension.score * 10}%` }}
                />
              </div>

              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {dimension.explanation}
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
          Investor Summary
        </h4>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
          &ldquo;{scoring.scoreExplanation}&rdquo;
        </p>
      </div>
    </section>
  );
}
