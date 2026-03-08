import { CompetitiveLandscape } from '@/shared/types';

interface Props {
  competitiveLandscape: CompetitiveLandscape;
}

export function CompetitionSection({ competitiveLandscape }: Props) {
  return (
    <section className="space-y-6 text-left">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Competitive Landscape
      </h2>
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-serif italic">
          &ldquo;{competitiveLandscape.marketContext}&rdquo;
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {competitiveLandscape.alternatives.map((alt, i) => (
            <div key={i} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:border-zinc-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {alt.name}
                  </h4>
                  <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {alt.type}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {alt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
