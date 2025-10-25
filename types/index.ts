// Common types for the finance app

export interface User {
  id: string;
  email: string;
  created_at: string;
  onboarding_completed?: boolean;
  onboarding_skipped?: boolean;
  privacy_consent_at?: string;
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

// Onboarding types
export type ResponseType = "text" | "number" | "choice" | "scale";

export interface OnboardingResponse {
  id?: string;
  user_id: string;
  question_id: string;
  question_text: string;
  response_type: ResponseType;
  response_value: any; // JSON field to store any type of answer
  created_at?: string;
  updated_at?: string;
}

export interface OnboardingProfile {
  id?: string;
  user_id: string;
  completion_percentage: number;
  is_completed: boolean;
  personality_type?: string;
  profile_summary?: string;
  strengths?: string[];
  growth_areas?: string[];
  money_mindset?: string;
  recommendations?: string[];
  generated_at?: string;
  last_updated?: string;
}
