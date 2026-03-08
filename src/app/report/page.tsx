import { ReportView } from '@/modules/opportunity-brief/components/ReportView';

interface Props {
  searchParams: Promise<{ data?: string }>;
}

export default async function ReportPage({ searchParams }: Props) {
  const { data } = await searchParams;

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-6 font-sans dark:bg-black">
      <ReportView encodedData={data} />
    </div>
  );
}
