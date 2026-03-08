import { TargetCustomer } from '@/shared/types';

interface Props {
  targetCustomer: TargetCustomer;
}

export function CustomerSection({ targetCustomer }: Props) {
  return (
    <section className="space-y-6 text-left">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Target Customer
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-zinc-800 dark:text-zinc-200">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Segment</p>
          <p className="text-lg font-medium leading-snug">{targetCustomer.segment}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Persona</p>
          <p className="text-lg font-medium leading-snug">{targetCustomer.persona}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Environment</p>
          <p className="text-lg leading-relaxed">{targetCustomer.environment}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Buyer vs User</p>
          <p className="text-lg leading-relaxed">{targetCustomer.buyerVsUser}</p>
        </div>
      </div>
    </section>
  );
}
