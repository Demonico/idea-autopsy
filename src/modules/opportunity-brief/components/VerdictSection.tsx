import { FinalVerdict } from '@/shared/types';

interface Props {
  finalVerdict: FinalVerdict;
}

export function VerdictSection({ finalVerdict }: Props) {
  return (
    <section className="border-t border-zinc-100 pt-10 dark:border-zinc-800 text-left">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        Final Verdict
      </h2>
      <div className="mt-6 space-y-6 text-zinc-800 dark:text-zinc-200">
        <p className="text-xl font-medium leading-relaxed tracking-tight text-zinc-900 dark:text-zinc-50">{finalVerdict.bottomLine}</p>
        <div className="space-y-3">
          <p className="font-bold text-zinc-900 dark:text-zinc-100">Success Conditions:</p>
          <ul className="list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
            {finalVerdict.successConditions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-zinc-900 p-6 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
          <p className="text-xs font-bold uppercase tracking-wider opacity-60">First thing to test</p>
          <p className="mt-3 text-lg font-bold leading-snug">{finalVerdict.firstTest}</p>
        </div>
      </div>
    </section>
  );
}
