import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getQuizzes } from '@/services/quizService';
import type { Quiz } from '@/types/quiz';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getQuizzes()
      .then(setQuizzes)
      .catch(() => setError('Could not load quizzes. Please try again later.'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p className="text-slate-600">Loading quizzes...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All quizzes</h1>
        <Link
          href="/create"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Create quiz
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {quizzes.length === 0 ? (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
          No quizzes yet. Create your first one!
        </p>
      ) : (
        <ul className="space-y-3">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <Link
                href={`/quizzes/${quiz.id}`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {quiz.title}
              </Link>
              <p className="text-sm text-slate-500">
                {quiz.questions.length}{' '}
                {quiz.questions.length === 1 ? 'question' : 'questions'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
