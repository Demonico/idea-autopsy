import { MVPScope } from '@/shared/types';

interface Props {
  mvpScope: MVPScope;
}

export function MVPSection({ mvpScope }: Props) {
  return (
    <section className="space-y-4 text-left">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        MVP Scope
      </h2>
      <div className="space-y-6">
        <div className="rounded border border-zinc-100 p-4 dark:border-zinc-800">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Core Action</p>
          <p className="mt-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">{mvpScope.coreAction}</p>
        </div>
        <div className="space-y-2">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Features:</span>
          <ul className="list-inside list-disc space-y-1 text-zinc-700 dark:text-zinc-300">
            {mvpScope.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Architecture</p>
          <p className="text-zinc-800 dark:text-zinc-200">{mvpScope.simplifiedArchitecture}</p>
        </div>
      </div>
    </section>
  );
}
