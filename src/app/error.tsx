'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // In production, send error to monitoring service here.
    // console.error(error);
  }, [error]);

  const mailto = () => {
    try {
      const subject = encodeURIComponent('Website error report');
      const body = encodeURIComponent(
        `Error: ${String(error?.message ?? 'Unknown')}\n\nURL: ${typeof window !== 'undefined' ? window.location.href : ''}`,
      );
      return `mailto:support@core-mediagroup.com?subject=${subject}&body=${body}`;
    } catch (e) {
      return 'mailto:support@core-mediagroup.com';
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <svg
            className="h-10 w-10 text-red-600 dark:text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Oops — something went wrong
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We ran into an unexpected issue while loading this page. You can try again or report the
            problem to our support team.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Try again
          </button>

          <Link
            href="/"
            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
          >
            Go to Home
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <a href={mailto()} className="text-sm text-gray-600 underline">
            Report issue
          </a>

          <button
            onClick={() => setShowDetails((s) => !s)}
            className="text-sm text-gray-500 underline"
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
        </div>

        {showDetails && (
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
              display: 'inline-block',
              maxWidth: '90%',
            }}
          >
            {String(error?.stack ?? error?.message ?? 'No details available')}
          </pre>
        )}
      </div>
    </div>
  );
}
