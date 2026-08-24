import Head from 'next/head';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const pageTitle = title ? `${title} · Quiz Builder` : 'Quiz Builder';

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Create and browse custom quizzes" />
      </Head>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/quizzes"
            className="text-lg font-bold tracking-tight text-indigo-600 hover:text-indigo-500"
          >
            Quiz<span className="text-slate-800">Builder</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm font-medium">
            <Link
              href="/quizzes"
              className="rounded-md px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              All quizzes
            </Link>
            <Link
              href="/create"
              className="rounded-md px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Create quiz
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Quiz Builder — full-stack assessment project
      </footer>
    </div>
  );
}
