import { useState, type FormEvent } from 'react';
import QuestionForm from '@/components/QuestionForm';
import { createQuiz } from '@/services/quizService';
import type { CreateQuizPayload, Question } from '@/types/quiz';

function createEmptyQuestion(): Question {
  return {
    id: crypto.randomUUID(),
    text: '',
    type: 'BOOLEAN',
    correctAnswer: true,
    answer: '',
    options: [],
  };
}

function toCreateQuizPayload(title: string, questions: Question[]): CreateQuizPayload {
  return {
    title,
    questions: questions.map((question) => {
      if (question.type === 'BOOLEAN') {
        return {
          text: question.text,
          type: question.type,
          correctAnswer: question.correctAnswer ?? true,
        };
      }
      if (question.type === 'INPUT') {
        return {
          text: question.text,
          type: question.type,
          answer: question.answer ?? '',
        };
      }
      return {
        text: question.text,
        type: question.type,
        options: (question.options ?? []).map((option) => ({
          text: option.text,
          isCorrect: option.isCorrect,
        })),
      };
    }),
  };
}

export default function QuizForm() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([createEmptyQuestion()]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  function addQuestion() {
    setQuestions([...questions, createEmptyQuestion()]);
  }

  function updateQuestion(id: string, changes: Partial<Question>) {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, ...changes } : question,
      ),
    );
  }

  function removeQuestion(id: string) {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setError('');
    setIsSaved(false);

    try {
      await createQuiz(toCreateQuizPayload(title, questions));
      setTitle('');
      setQuestions([createEmptyQuestion()]);
      setIsSaved(true);
    } catch {
      setError('Could not save the quiz. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Quiz title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          placeholder="My first quiz"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuestionForm
            key={question.id}
            index={index}
            question={question}
            canRemove={questions.length > 1}
            onChange={updateQuestion}
            onRemove={removeQuestion}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addQuestion}
        className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
      >
        Add question
      </button>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save quiz'}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {isSaved && !error && <p className="text-sm text-green-600">Quiz saved!</p>}
      </div>
    </form>
  );
}
