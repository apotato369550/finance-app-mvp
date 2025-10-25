import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-utils';
import { ONBOARDING_QUESTIONS, getTotalQuestions } from '@/lib/onboarding-questions';
import { supabase, isDevMode } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(request);
    if (authResult.error) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const userId = authResult.user!.id;

    // Get user's answered questions count
    let answeredCount = 0;
    if (!isDevMode()) {
      // In production, query the database
      const { count, error } = await supabase
        .from('onboarding_response')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching answered questions:', error);
      } else {
        answeredCount = count || 0;
      }
    } else {
      // In dev mode, return 0 as we'll handle this on the frontend
      answeredCount = 0;
    }

    const totalCount = getTotalQuestions();
    const completionPercentage = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;

    return NextResponse.json({
      questions: ONBOARDING_QUESTIONS,
      answered_count: answeredCount,
      total_count: totalCount,
      completion_percentage: completionPercentage,
    });

  } catch (error) {
    console.error('Error fetching onboarding questions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}