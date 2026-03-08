import { OpportunityBrief } from '@/shared/types';

interface Props {
  id: string;
  inputIdea: string;
  createdAt: string;
}

export function ReportHeader({ id, inputIdea, createdAt }: Props) {
  return (
    <header className="border-b border-zinc-100 pb-12 dark:border-zinc-800 text-left">
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          Opportunity Brief
        </span>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
          ID: {id.slice(0, 8)}...
        </span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
        {inputIdea}
      </h1>
      <div className="mt-8 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <span className="font-medium">{new Date(createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</span>
        <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="font-medium italic">Investor Deconstruction</span>
      </div>
    </header>
  );
}
