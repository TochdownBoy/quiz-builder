import type { CreateQuizPayload, Quiz } from '@/types/quiz';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function createQuiz(payload: CreateQuizPayload): Promise<Quiz> {
  const response = await fetch(`${API_URL}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to create quiz (status ${response.status})`);
  }

  return response.json();
}

export async function getQuizzes(): Promise<Quiz[]> {
  const response = await fetch(`${API_URL}/quizzes`);

  if (!response.ok) {
    throw new Error(`Failed to load quizzes (status ${response.status})`);
  }

  return response.json();
}

export async function getQuiz(id: string): Promise<Quiz> {
  const response = await fetch(`${API_URL}/quizzes/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to load quiz (status ${response.status})`);
  }

  return response.json();
}
