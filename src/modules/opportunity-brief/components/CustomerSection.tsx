import { TargetCustomer } from '@/shared/types';

interface Props {
  targetCustomer: TargetCustomer;
}

export function CustomerSection({ targetCustomer }: Props) {
  return (
    <section className="space-y-4 text-left">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        Target Customer
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-zinc-800 dark:text-zinc-200">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Segment</p>
          <p className="mt-1 font-medium">{targetCustomer.segment}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Persona</p>
          <p className="mt-1 font-medium">{targetCustomer.persona}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Environment</p>
          <p className="mt-1 font-medium">{targetCustomer.environment}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Buyer vs User</p>
          <p className="mt-1 font-medium">{targetCustomer.buyerVsUser}</p>
        </div>
      </div>
    </section>
  );
}
