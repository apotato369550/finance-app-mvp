# Onboarding Questions Configuration

This directory contains the configuration for the onboarding flow questions.

## Files

- `onboarding-questions.ts` - Main configuration file with all questions and helper functions

## Question Structure

Each question follows this structure:

```typescript
interface OnboardingQuestion {
  id: string;                    // Unique identifier (e.g., "spending_100k")
  text: string;                  // The question text
  type: ResponseType;           // "text", "number", "choice", "scale_1_5", "scale_1_10"
  options?: string[];           // For choice and scale questions
  category: QuestionCategory;   // "mindset", "behavior", "numbers", "goals"
  required: boolean;            // Whether the question must be answered
  order: number;                // Display order (1-14)
}
```

## Question Categories

- **mindset**: Questions about relationship with money and financial concepts
- **behavior**: Questions about current financial status and habits
- **numbers**: Questions asking for specific amounts (income, savings, etc.)
- **goals**: Questions about financial goals and lending/borrowing behavior

## Helper Functions

The configuration file exports several helper functions:

- `getQuestionsByCategory(category)` - Get all questions in a specific category
- `getQuestionById(id)` - Get a specific question by ID
- `getTotalQuestions()` - Get total number of questions (14)
- `getRequiredQuestions()` - Get only required questions
- `getQuestionsInOrder()` - Get questions sorted by order

## Testing Instructions

To test the question configuration:

1. Import the questions in a component or test file:
   ```typescript
   import { ONBOARDING_QUESTIONS, getTotalQuestions, getQuestionsByCategory } from '@/lib/onboarding-questions';
   ```

2. Verify the structure:
   ```typescript
   console.log('Total questions:', getTotalQuestions());
   console.log('Mindset questions:', getQuestionsByCategory('mindset').length);
   console.log('Questions in order:', getQuestionsInOrder().map(q => q.id));
   ```

3. Check each question has required fields:
   ```typescript
   ONBOARDING_QUESTIONS.forEach(question => {
     console.log(`Question ${question.id}: ${question.text.substring(0, 50)}...`);
     console.log(`  Type: ${question.type}, Category: ${question.category}, Required: ${question.required}`);
   });
   ```

## Question Flow

The questions are organized in this logical flow:

1. **Mindset (1-4)**: Understanding relationship with money
2. **Numbers (5-7)**: Income and spending amounts
3. **Behavior (8-11)**: Current financial status
4. **Goals (12-14)**: Financial goals and behaviors

This creates a natural conversation flow from abstract concepts to concrete numbers to current state to future goals.