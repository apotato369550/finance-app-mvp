import { OnboardingProfile } from '@/types';

// Mock profile analyzer - returns a mock profile based on responses
export function generateMockProfile(
  responses: Record<string, any>,
  _questionTexts: Record<string, string>
): Omit<OnboardingProfile, 'id' | 'user_id' | 'generated_at' | 'last_updated'> {
  // Simple mock logic based on spending_100k answer
  const spending100k = responses['spending_100k'] || '';
  const moneyRelationship = responses['money_relationship'] || '';

  // Determine personality type based on responses
  let personalityType = 'The Balanced Builder';
  if (
    spending100k.toLowerCase().includes('save') ||
    moneyRelationship.toLowerCase().includes('careful')
  ) {
    personalityType = 'The Cautious Saver';
  } else if (
    spending100k.toLowerCase().includes('invest') ||
    moneyRelationship.toLowerCase().includes('growth')
  ) {
    personalityType = 'The Growth-Focused Investor';
  } else if (
    spending100k.toLowerCase().includes('spend') ||
    moneyRelationship.toLowerCase().includes('enjoy')
  ) {
    personalityType = 'The Joyful Spender';
  }

  return {
    completion_percentage: 100,
    is_completed: true,
    personality_type: personalityType,
    profile_summary: `You are ${personalityType}. Based on your responses, you have a thoughtful approach to personal finance. Your answers reveal a consistent philosophy about money and financial decision-making. This profile reflects your current perspective and can evolve as your circumstances and priorities change.`,
    strengths: [
      'Self-aware about financial habits',
      'Clear perspective on money and value',
      'Willing to reflect on financial behavior',
      'Open to financial growth',
      'Honest about current financial situation',
    ],
    growth_areas: [
      'Consider developing a more structured savings plan',
      'Explore investment options aligned with your goals',
      'Build an emergency fund if not already present',
      'Track spending habits regularly',
      'Review and adjust financial goals quarterly',
    ],
    money_mindset:
      'Your relationship with money is pragmatic and thoughtful. You value both security and growth, and you understand the importance of intentional financial decisions.',
    recommendations: [
      'Set up automatic transfers to a savings account',
      'Review your current investment portfolio quarterly',
      'Create a budget aligned with your monthly income',
      'Explore additional income streams if interested',
      'Continue learning about financial literacy',
      'Build relationships with trusted financial advisors',
      'Celebrate small financial wins along the way',
    ],
  };
}

// TODO: Implement real AI profile generation
// This function should call OpenAI or Claude API to generate profile
export async function generateProfileWithAI(
  _responses: Record<string, any>,
  _questionTexts: Record<string, string>,
  _useRealAI: boolean = false
): Promise<Omit<OnboardingProfile, 'id' | 'user_id' | 'generated_at' | 'last_updated'>> {
  // For now, always return mock
  // In the future, check if useRealAI is true and NEXT_PUBLIC_DEV_MODE is false
  // Then call actual OpenAI/Claude endpoint

  return generateMockProfile(_responses, _questionTexts);

  // TODO: Real implementation below
  /*
  if (useRealAI && !isDevMode()) {
    try {
      const response = await fetch('/api/analyze-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses, questionTexts }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error generating AI profile:', error);
    }
  }

  // Fallback to mock
  return generateMockProfile(_responses, _questionTexts);
  */
}
