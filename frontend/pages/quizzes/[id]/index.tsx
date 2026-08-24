import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import QuestionDisplay from '@/components/QuestionDisplay';
import { getQuiz } from '@/services/quizService';
import type { Quiz } from '@/types/quiz';

export default function QuizDetailsPage() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : undefined;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    getQuiz(id)
      .then(setQuiz)
      .catch(() => setError('Could not load the quiz. Please try again later.'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (!router.isReady || isLoading) {
    return <p className="text-slate-600">Loading quiz...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!quiz) {
    return null;
  }

  return (
    <div>
      <Link href="/quizzes" className="text-sm text-indigo-600 hover:text-indigo-500">
        Back to all quizzes
      </Link>

      <h1 className="mb-6 mt-2 text-2xl font-bold">{quiz.title}</h1>

      <ul className="space-y-4">
        {quiz.questions.map((question, index) => (
          <QuestionDisplay key={question.id} number={index + 1} question={question} />
        ))}
      </ul>
    </div>
  );
}
