import { OpportunityBrief } from '@/shared/types';

interface Props {
  id: string;
  inputIdea: string;
  createdAt: string;
}

export function ReportHeader({ id, inputIdea, createdAt }: Props) {
  return (
    <header className="border-b border-zinc-100 pb-8 dark:border-zinc-800">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Opportunity Brief
      </h1>
      <p className="mt-4 italic text-zinc-600 dark:text-zinc-400">
        "{inputIdea}"
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-600">
        <span>ID: {id}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </header>
  );
}
