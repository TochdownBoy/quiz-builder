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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Quiz title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          placeholder="My first quiz"
        />
      </div>

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

      <button type="button" onClick={addQuestion}>
        Add question
      </button>

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save quiz'}
      </button>

      {error && <p>{error}</p>}
      {isSaved && !error && <p>Quiz saved!</p>}
    </form>
  );
}
