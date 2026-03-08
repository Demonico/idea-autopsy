import { KeyRisks } from '@/shared/types';

interface Props {
  keyRisks: KeyRisks;
}

export function RiskSection({ keyRisks }: Props) {
  return (
    <section className="space-y-6 text-left">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 text-red-700 dark:text-red-500">
        Key Risks & Kill Shot
      </h2>
      <div className="space-y-6">
        <div className="rounded-xl border-2 border-red-100 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30">
          <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">The Kill Shot</p>
          <p className="mt-2 text-lg font-bold text-red-950 dark:text-red-50 leading-snug">{keyRisks.killShot}</p>
        </div>
        <div className="space-y-3">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Assumptions & Risks:</span>
          <div className="grid gap-2">
            {keyRisks.assumptions.map((a, i) => (
              <div key={i} className="flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300 p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <span className="font-medium">{a.assumption}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded shrink-0 ml-4 ${
                  a.riskLevel === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-100' :
                  a.riskLevel === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-100' :
                  'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
                }`}>{a.riskLevel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
