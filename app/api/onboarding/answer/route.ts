import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-utils';
import { getQuestionById } from '@/lib/onboarding-questions';
import { supabase, isDevMode } from '@/lib/supabase';

export async function POST(request: NextRequest) {
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
    const { question_id, response_value } = await request.json();

    if (!question_id || response_value === undefined) {
      return NextResponse.json(
        { error: 'question_id and response_value are required' },
        { status: 400 }
      );
    }

    // Validate question exists
    const question = getQuestionById(question_id);
    if (!question) {
      return NextResponse.json(
        { error: 'Invalid question_id' },
        { status: 400 }
      );
    }

    if (isDevMode()) {
      // In dev mode, just return success (mock save)
      console.log(`Dev mode: Would save answer for user ${userId}, question ${question_id}:`, response_value);
      return NextResponse.json({
        success: true,
        message: 'Answer saved (dev mode)',
        completion_percentage: 0, // Will be calculated on frontend
        next_question_id: null, // Will be handled on frontend
      });
    } else {
      // In production, save to database
      const { error } = await supabase
        .from('onboarding_response')
        .upsert({
          user_id: userId,
          question_id,
          question_text: question.text,
          response_type: question.type,
          response_value,
        });

      if (error) {
        console.error('Error saving onboarding response:', error);
        return NextResponse.json(
          { error: 'Failed to save response' },
          { status: 500 }
        );
      }

      // Calculate completion percentage
      const { count: totalQuestions } = await supabase
        .from('onboarding_response')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      const completionPercentage = Math.round(((totalQuestions || 0) / 14) * 100);

      // Update user's onboarding profile
      await supabase
        .from('onboarding_profile')
        .upsert({
          user_id: userId,
          completion_percentage: completionPercentage,
          is_completed: completionPercentage === 100,
          last_updated: new Date().toISOString(),
        });

      return NextResponse.json({
        success: true,
        completion_percentage: completionPercentage,
        next_question_id: null, // Will be handled on frontend
      });
    }

  } catch (error) {
    console.error('Error saving onboarding answer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}