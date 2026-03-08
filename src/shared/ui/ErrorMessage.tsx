'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  title?: string;
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
  backHref?: string;
}

export function ErrorMessage({ title = 'Something went wrong', message, onRetry, onBack, backHref = '/' }: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push(backHref);
    }
  };

  return (
    <div className="flex min-h-[40vh] items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl border-2 border-red-50 bg-red-50/50 p-8 text-center dark:border-red-900/20 dark:bg-red-950/10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-red-900 dark:text-red-100">{title}</h3>
          <p className="text-sm text-red-700 dark:text-red-300 opacity-80">{message}</p>
        </div>
        <div className="flex flex-col gap-3 pt-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
            >
              Try again
            </button>
          )}
          <button
            onClick={handleBack}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 border border-zinc-200 hover:bg-zinc-50 transition-colors shadow-sm dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
          >
            Go back home
          </button>
        </div>
      </div>
    </div>
  );
}
