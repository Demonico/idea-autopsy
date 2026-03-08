import { IdeaInputForm } from '@/modules/idea-input/components/IdeaInputForm';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 font-sans dark:bg-black">
      <main className="w-full max-w-2xl space-y-8 text-center">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Idea Autopsy
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Deconstruct your startup idea like a skeptical investor.
          </p>
        </header>

        <IdeaInputForm />
      </main>
    </div>
  );
}
