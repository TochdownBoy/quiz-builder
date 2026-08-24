import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, type FormEvent } from 'react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const router = useRouter();
  const [searchId, setSearchId] = useState('');

  const pageTitle = title ? `${title} · Quiz Builder` : 'Quiz Builder';

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = searchId.trim();
    if (!id) {
      return;
    }

    router.push(`/quizzes/${id}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Create and browse custom quizzes" />
      </Head>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Quiz Builder logo" width={32} height={32} />
            <span className="text-lg font-bold tracking-tight text-indigo-600 hover:text-indigo-500">
              Quiz<span className="text-slate-800">Builder</span>
            </span>
          </Link>

          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={searchId}
              onChange={(event) => setSearchId(event.target.value)}
              placeholder="Quiz ID"
              className="w-44 rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Search by ID
            </button>
          </form>

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
