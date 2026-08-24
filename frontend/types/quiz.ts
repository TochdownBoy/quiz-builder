export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  correctAnswer?: boolean;
  answer?: string;
  options?: Option[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface CreateOptionPayload {
  text: string;
  isCorrect: boolean;
}

export interface CreateQuestionPayload {
  text: string;
  type: QuestionType;
  correctAnswer?: boolean;
  answer?: string;
  options?: CreateOptionPayload[];
}

export interface CreateQuizPayload {
  title: string;
  questions: CreateQuestionPayload[];
}