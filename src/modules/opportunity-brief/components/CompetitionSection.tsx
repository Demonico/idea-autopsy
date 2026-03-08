import { CompetitiveLandscape } from '@/shared/types';

interface Props {
  competitiveLandscape: CompetitiveLandscape;
}

export function CompetitionSection({ competitiveLandscape }: Props) {
  return (
    <section className="space-y-4 text-left">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        Competitive Landscape
      </h2>
      <div className="space-y-6">
        <p className="text-zinc-700 dark:text-zinc-300">{competitiveLandscape.marketContext}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {competitiveLandscape.alternatives.map((alt, i) => (
            <div key={i} className="rounded border border-zinc-100 p-4 dark:border-zinc-800">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{alt.name}</span>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-zinc-500">{alt.type}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{alt.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
