import { ReportView } from '@/modules/opportunity-brief/components/ReportView';
import { decodeBrief } from '@/modules/opportunity-brief/utils/sharing';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ data?: string }>;
}

export default async function ReportPage({ searchParams }: Props) {
  const { data } = await searchParams;

  if (!data) {
    redirect('/');
  }

  const decodedBrief = decodeBrief(data);
  if (!decodedBrief) {
    return (
      <div className="min-h-screen bg-zinc-50 py-12 px-6 font-sans dark:bg-black">
        <ErrorMessage 
          title="Invalid Link" 
          message="The shared link appears to be invalid or corrupted. Please check the URL and try again."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-6 font-sans dark:bg-black">
      <ReportView brief={decodedBrief} />
    </div>
  );
}
