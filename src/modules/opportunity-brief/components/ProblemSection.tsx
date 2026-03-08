import { ProblemDefinition } from '@/shared/types';

interface Props {
  problemDefinition: ProblemDefinition;
}

export function ProblemSection({ problemDefinition }: Props) {
  return (
    <section className="space-y-6 text-left">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Problem Definition
      </h2>
      <div className="space-y-4 text-zinc-800 dark:text-zinc-200">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Core Problem</p>
          <p className="text-lg leading-relaxed">{problemDefinition.coreProblem}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Pain Point</p>
          <p className="text-lg leading-relaxed font-medium">{problemDefinition.painPoint}</p>
        </div>
        <div className="pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Affected Workflows</p>
          <ul className="grid gap-2 list-none text-zinc-700 dark:text-zinc-300">
            {problemDefinition.affectedWorkflows.map((w, i) => (
              <li key={i} className="flex items-start gap-2 bg-zinc-50 dark:bg-zinc-900/30 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50">
                <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs mt-1">0{i+1}</span>
                <span className="text-sm font-medium">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
