// Common types for the finance app

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
}

export interface QuizResult {
  userId?: string;
  answers: QuizAnswer[];
  analysis?: string;
  createdAt: string;
}

export interface Fund {
  id: string;
  name: string;
  description?: string;
  category?: string;
  riskLevel?: string;
  minimumInvestment?: number;
}

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  content?: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
