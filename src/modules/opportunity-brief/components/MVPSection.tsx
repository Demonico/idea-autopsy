import { MVPScope } from '@/shared/types';

interface Props {
  mvpScope: MVPScope;
}

export function MVPSection({ mvpScope }: Props) {
  return (
    <section className="space-y-6 text-left">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        MVP Scope
      </h2>
      <div className="space-y-8">
        <div className="rounded-2xl bg-zinc-900 p-8 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-lg">
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">The Core Action</p>
          <p className="mt-3 text-2xl font-bold leading-tight tracking-tight">{mvpScope.coreAction}</p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Key Features</p>
            <ul className="space-y-3">
              {mvpScope.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                  <svg className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Architecture</p>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                {mvpScope.simplifiedArchitecture}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Time-to-Value</p>
              <p className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-900/50">
                {mvpScope.timeToValue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
