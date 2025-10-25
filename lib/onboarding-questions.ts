import { OnboardingQuestion } from '@/types';

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  // Mindset Questions (1-4)
  {
    id: 'spending_100k',
    text: 'If you had 100,000 pesos, what would you do with it?',
    type: 'text',
    category: 'mindset',
    required: true,
    order: 1,
  },
  {
    id: 'investment_meaning',
    text: 'What does the word "investment" mean to you?',
    type: 'text',
    category: 'mindset',
    required: true,
    order: 2,
  },
  {
    id: 'money_meaning',
    text: 'What does "money" mean to you?',
    type: 'text',
    category: 'mindset',
    required: true,
    order: 3,
  },
  {
    id: 'money_relationship',
    text: 'How would you describe your relationship with money?',
    type: 'text',
    category: 'mindset',
    required: true,
    order: 4,
  },

  // Numbers Questions (5-7)
  {
    id: 'monthly_income',
    text: 'What is your estimated monthly income?',
    type: 'number',
    category: 'numbers',
    required: true,
    order: 5,
  },
  {
    id: 'monthly_savings_amount',
    text: 'How much do you set aside per month for savings/investments?',
    type: 'number',
    category: 'numbers',
    required: false,
    order: 6,
  },
  {
    id: 'family_monthly_spending',
    text: 'How much money do you spend on your family monthly?',
    type: 'number',
    category: 'numbers',
    required: false,
    order: 7,
  },

  // Behavior Questions (8-10)
  {
    id: 'paycheck_to_paycheck',
    text: 'Do you live paycheck to paycheck?',
    type: 'choice',
    options: ['Yes', 'Sometimes', 'No'],
    category: 'behavior',
    required: true,
    order: 8,
  },
  {
    id: 'liquid_savings',
    text: 'How much do you have saved in a liquid bank account?',
    type: 'choice',
    options: ['<10k', '10k-50k', '50k-100k', '100k-500k', '500k+', 'Prefer not to say'],
    category: 'behavior',
    required: true,
    order: 9,
  },
  {
    id: 'invested_assets',
    text: 'How much do you have invested in different assets?',
    type: 'choice',
    options: ['<10k', '10k-50k', '50k-100k', '100k-500k', '500k+', 'Prefer not to say'],
    category: 'behavior',
    required: true,
    order: 10,
  },
  {
    id: 'estimated_net_worth',
    text: 'What would you say is your estimated net worth?',
    type: 'choice',
    options: ['<10k', '10k-50k', '50k-100k', '100k-500k', '500k+', 'Prefer not to say'],
    category: 'behavior',
    required: true,
    order: 11,
  },

  // Goals Questions (12-14)
  {
    id: 'savings_rate',
    text: 'What is your estimated monthly savings rate?',
    type: 'choice',
    options: ['0-10%', '10-20%', '20-30%', '30%+', "I don't save regularly"],
    category: 'goals',
    required: true,
    order: 12,
  },
  {
    id: 'loan_others',
    text: 'Do you loan money to others often?',
    type: 'scale_1_5',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    category: 'goals',
    required: true,
    order: 13,
  },
  {
    id: 'borrow_money',
    text: 'Do you borrow money often?',
    type: 'scale_1_5',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    category: 'goals',
    required: true,
    order: 14,
  },
];

// Helper functions
export const getQuestionsByCategory = (category: OnboardingQuestion['category']): OnboardingQuestion[] => {
  return ONBOARDING_QUESTIONS.filter(q => q.category === category);
};

export const getQuestionById = (id: string): OnboardingQuestion | undefined => {
  return ONBOARDING_QUESTIONS.find(q => q.id === id);
};

export const getTotalQuestions = (): number => {
  return ONBOARDING_QUESTIONS.length;
};

export const getRequiredQuestions = (): OnboardingQuestion[] => {
  return ONBOARDING_QUESTIONS.filter(q => q.required);
};

export const getQuestionsInOrder = (): OnboardingQuestion[] => {
  return [...ONBOARDING_QUESTIONS].sort((a, b) => a.order - b.order);
};