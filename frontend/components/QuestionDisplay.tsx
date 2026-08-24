import type { Question } from '@/types/quiz';

interface QuestionDisplayProps {
  number: number;
  question: Question;
}

export default function QuestionDisplay({ number, question }: QuestionDisplayProps) {
  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="font-medium">
        {number}. {question.text}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
        {question.type}
      </p>

      {question.type === 'BOOLEAN' && (
        <p className="mt-2 text-sm text-slate-700">
          Correct answer:{' '}
          <span className="text-green-600">
            {question.correctAnswer ? 'True' : 'False'}
          </span>
        </p>
      )}

      {question.type === 'INPUT' && (
        <p className="mt-2 text-sm text-slate-700">
          Correct answer: <span className="text-green-600">{question.answer}</span>
        </p>
      )}

      {question.type === 'CHECKBOX' && (
        <ul className="mt-2 space-y-1">
          {(question.options ?? []).map((option) => (
            <li key={option.id} className="text-sm text-slate-700">
              {option.text}
              {option.isCorrect && (
                <span className="ml-2 text-green-600">(correct)</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
