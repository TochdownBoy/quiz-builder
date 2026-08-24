import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
      <h1 className="text-3xl font-bold">Quiz Builder</h1>
      <p className="mt-2 text-slate-600">
        Build quizzes with boolean, text input and checkbox questions.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Link
          href="/create"
          className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Create a quiz
        </Link>
        <Link
          href="/quizzes"
          className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
        >
          Browse quizzes
        </Link>
      </div>
    </div>
  );
}
