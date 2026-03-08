import { ProblemDefinition } from '@/shared/types';

interface Props {
  problemDefinition: ProblemDefinition;
}

export function ProblemSection({ problemDefinition }: Props) {
  return (
    <section className="space-y-4 text-left">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        Problem Definition
      </h2>
      <div className="space-y-2 text-zinc-800 dark:text-zinc-200">
        <p>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Core Problem:</span> {problemDefinition.coreProblem}
        </p>
        <p>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Pain Point:</span> {problemDefinition.painPoint}
        </p>
        <div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Affected Workflows:</span>
          <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-700 dark:text-zinc-300">
            {problemDefinition.affectedWorkflows.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
